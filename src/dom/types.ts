export interface ElementSource {
    createElement(name: string): Nullable<HTMLElement>;
    getElement(id: string): Nullable<HTMLElement>;
    afterLoad(callback: Function): void;
}

export interface PixelRatioSource {
    devicePixelRatio?: number;
}