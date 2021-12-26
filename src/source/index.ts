import { SourceProvider } from "./types";

import '../img/bomb.png';
import '../img/flag.png';

/** To interact with the file system */
export class FileSource implements SourceProvider {
    constructor() {}

    /**
     * Returns image file
     * 
     * @param name - image file name
     */
    getImage(name: string): CanvasImageSource {
        const img = new Image();
        img.src = `img/${name}.png`;

        return img;
    }
}