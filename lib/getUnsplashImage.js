import fetch from "isomorphic-unfetch";
import { Potrace } from "potrace";
import SVGO from "svgo";
import Vibrant from "node-vibrant";
import sharp from "sharp";
import fs from "fs";

const temporaryStoreImage = (slug, resp) =>
  new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(`/tmp/${slug}.png`);
    if (!resp || !resp.body) {
      reject("no body on fetch response");
    } else {
      resp.body.pipe(fileStream);
      fileStream.on("finish", () => {
        resolve();
      });
      fileStream.on("error", err => {
        reject(err);
      });
    }
  });

const removeTemporaryImage = slug =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(`/tmp/${slug}.png`)) {
      fs.unlink(`/tmp/${slug}.png`, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });

function encodeSvgDataUri(svg) {
  var uriPayload = encodeURIComponent(svg)
    .replace(/%0A/g, "")
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'");

  return "data:image/svg+xml," + uriPayload;
}

const optimizeSvg = async svg => {
  var svgo = new SVGO({ floatPrecision: 0 });
  const result = await svgo.optimize(svg);
  return result.data;
};

const extractMostProminentColor = async filePath => {
  var vibrant = new Vibrant(filePath);
  const palette = await vibrant.getPalette();
  let mostProminentColor = "";
  let highestPopulation = 0;
  let color = "";
  let population = 0;

  Object.keys(palette).forEach(function(key) {
    if (palette[key] === null) {
      return;
    }

    // @ts-ignore
    color = palette[key].getHex();
    // @ts-ignore
    population = palette[key].getPopulation();

    if (population > highestPopulation) {
      mostProminentColor = color;
      highestPopulation = population;
    }
  });

  return mostProminentColor;
};

function traceSvg(filePath, traceParams) {
  return new Promise(function(resolve, reject) {
    var trace = new Potrace(traceParams);

    trace.loadImage(filePath, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(trace.getSVG());
      }
    });
  });
}

const generateSVGTrace = async (slug, options = {}) => {
  const traceParams = {
    turnPolicy: options.turnPolicy
      ? Potrace[options.turnPolicy]
      : Potrace.TURNPOLICY_MINORITY,
    turdSize: options.turdSize ? parseFloat(options.turdSize) : 100,
    alphaMax: options.alphaMax ? parseFloat(options.alphaMax) : 1,
    optCurve: options.optCurve ? options.optCurve : true,
    optTolerance: options.optTolerance ? parseFloat(options.optTolerance) : 0.2,
    threshold: options.threshold
      ? Potrace[options.threshold] || parseFloat(options.threshold)
      : Potrace.THRESHOLD_AUTO,
    blackOnWhite: options.flipColors ? !options.flipColors : true,
    background: options.background
      ? Potrace[options.background] || options.background
      : Potrace.COLOR_TRANSPARENT,
    color: Potrace.COLOR_AUTO
  };

  const color = options.color
    ? Potrace[options.color] || options.color
    : Potrace.COLOR_AUTO;

  const getFillColor =
    color === Potrace.COLOR_AUTO
      ? extractMostProminentColor(`/tmp/${slug}.png`)
      : Promise.resolve(color);

  const fillColor = await getFillColor;
  traceParams.color = fillColor;

  const svg = await traceSvg(`/tmp/${slug}.png`, traceParams);
  const optimizedSVG = await optimizeSvg(svg);
  const encodedSVG = encodeSvgDataUri(optimizedSVG);

  return encodedSVG;
};

const convertImageToWebP = slug =>
  new Promise((resolve, reject) => {
    sharp(`/tmp/${slug}.png`).toFile(
      `${process.cwd()}/public/images/${slug}.webp`,
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });

const getUnsplashImage = async photo => {
  const resp = await fetch(
    `https://images.unsplash.com/${photo}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`
  );

  await temporaryStoreImage(photo, resp);
  await convertImageToWebP(photo);
  const svg = await generateSVGTrace(photo);
  await removeTemporaryImage(photo);

  return {
    svg,
    webp: photo
  };
};

export default getUnsplashImage;
