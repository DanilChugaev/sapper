import { SourceProvider } from './types';

import '../img/bomb.png';
import '../img/flag.png';

/** To interact with the file system */
export class FileSource implements SourceProvider {
  /**
   * @param ImageProvider - returns image object
   */
  constructor(
    private ImageProvider: typeof Image,
  ) {}

  /**
   * Returns image file
   *
   * @param name - image file name
   */
  public getImage(name: string): CanvasImageSource {
    const img = new this.ImageProvider();

    img.src = `img/${name}.png`;

    return img;
  }
}
