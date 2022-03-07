/** To interact with the file system */
export interface SourceInterface {
    /**
     * Returns image file
     *
     * @param name - image file name
     */
    getImage(name: string): CanvasImageSource;
}
