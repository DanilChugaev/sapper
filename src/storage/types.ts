/** Name of key in the store */
export type StorageName = string;

/** Stored item */
export type StorageItem = {
    name: string;
    value: string;
};

/** Long-term storage of game data */
export interface StorageProvider {
    /**
     * Saves an item to storage
     *
     * @param storageItem - stored item
     */
    save(item: StorageItem): void;

    /**
     * Get item from storage
     *
     * @param name - name of key in the store
     */
    get(name: StorageName): string;
}
