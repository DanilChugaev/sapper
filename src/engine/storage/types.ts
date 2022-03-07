/** Name of key in the store */
export type StorageName = string;
/** Value in the store */
export type StorageValue = string;

/** Stored item */
export type StorageItem = {
    name: StorageName;
    value: StorageValue;
};

/** Long-term storage of game data */
export interface StorageInterface {
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
    get(name: StorageName): StorageValue;
}
