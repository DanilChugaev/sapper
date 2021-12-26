import { StorageProvider, StorageItem, StorageName } from "./types";

/** Long-term storage of game data */
export class DataStorage implements StorageProvider {
    constructor(
        private storage: Storage
    ) {}

    /**
     * Saves an item to storage
     *
     * @param storageItem - stored item
     * @param storageItem.name - name of key in the store
     * @param storageItem.value - the key value in the store
     */
    save({ name, value }: StorageItem): void {
        this.storage.setItem(name, value);
    }

    /**
     * Get item from storage
     *
     * @param name - name of key in the store
     */
    get(name: StorageName): string {
        return this.storage.getItem(name);
    }
}