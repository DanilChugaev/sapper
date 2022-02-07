import { StorageProvider, StorageItem, StorageName, StorageValue } from './types';

/** Long-term storage of game data */
export class DataStorage implements StorageProvider {
  /**
   * Saves an item to storage
   *
   * @param storageItem - stored item
   * @param storageItem.name - name of key in the store
   * @param storageItem.value - the key value in the store
   */
  public save({ name, value }: StorageItem): void {
    window.localStorage.setItem(name, value);
  }

  /**
   * Get item from storage
   *
   * @param name - name of key in the store
   */
  public get(name: StorageName): StorageValue {
    return window.localStorage.getItem(name);
  }
}
