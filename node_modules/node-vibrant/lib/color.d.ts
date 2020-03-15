import { Filter } from './typing';
export declare type Vec3 = [number, number, number];
export interface Palette {
    Vibrant?: Swatch;
    Muted?: Swatch;
    DarkVibrant?: Swatch;
    DarkMuted?: Swatch;
    LightVibrant?: Swatch;
    LightMuted?: Swatch;
    [name: string]: Swatch | undefined;
}
export declare class Swatch {
    static applyFilter(colors: Swatch[], f: Filter): Swatch[];
    private _hsl;
    private _rgb;
    private _yiq;
    private _population;
    private _hex;
    get r(): number;
    get g(): number;
    get b(): number;
    get rgb(): Vec3;
    get hsl(): Vec3;
    get hex(): string;
    get population(): number;
    toJSON(): {
        rgb: Vec3;
        population: number;
    };
    getRgb(): Vec3;
    getHsl(): Vec3;
    getPopulation(): number;
    getHex(): string;
    private getYiq;
    private _titleTextColor;
    private _bodyTextColor;
    get titleTextColor(): string;
    get bodyTextColor(): string;
    getTitleTextColor(): string;
    getBodyTextColor(): string;
    constructor(rgb: Vec3, population: number);
}
