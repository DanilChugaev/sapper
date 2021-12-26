/** To interact with the file system */
export interface SourceProvider {
    /**
     * Returns image file
     * 
     * @param name - image file name
     */
    getImage(name: string): CanvasImageSource;
}