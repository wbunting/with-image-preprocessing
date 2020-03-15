import React from "react";
import getUnsplashImage from "../lib/getUnsplashImage";

const Page = ({ image }) => {
  return (
    <div>
      <div className="container">
        <div className="invisible" />
        <img src={image.svg} />
        <img src={`/images/${image.webp}.webp`} />
        <style jsx>{`
          .container {
            width: 100%;
            height: 800px;
            position: relative;
          }

          .invisible {
            width: 100%;
            paddingbottom: 55%;
          }

          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const image = await getUnsplashImage("photo-1558980394-0a06c4631733");

  return {
    props: {
      image
    }
  };
}

export default Page;
