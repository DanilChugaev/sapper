import { SourceProvider } from "./types";

import '../img/bomb.png';
import '../img/flag.png';

export class FileSource implements SourceProvider {
    private imageNameArr: string[] = [];
    private imageArr: any[] = [];

    constructor() {}

    getImage(name: string): any {
        // if (this.imageNameArr.includes(name)) {
        //     // @ts-ignore
        //     return this.imageArr[name];
        // }

        const img = new Image();
        img.src = `img/${name}.png`;

        // this.imageNameArr.push(name);
        // this.imageArr.push(img);

        return img;
    }
}