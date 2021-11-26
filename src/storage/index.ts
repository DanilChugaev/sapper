import { StorageProvider, StorageItem, StorageName } from "./types";

/** Долговременное хранилище данных игры */
export class DataStorage implements StorageProvider {
    constructor(
        private storage: Storage
    ) {}

    save({ name, value }: StorageItem): void {
        this.storage.setItem(name, value);
    }

    get(name: StorageName): string {
        return this.storage.getItem(name);
    }
}