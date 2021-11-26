/** Имя ключа для хранения */
export type StorageName = string;

/** Сохраненный элемент */
export type StorageItem = {
    name: string;
    value: string;
}

/** Долговременное хранилище данных игры */
export interface StorageProvider {
    save(item: StorageItem): void;
    get(name: StorageName): string;
}