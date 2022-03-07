import { StorageInterface, StorageItem, StorageName, StorageValue } from './types';

/** Long-term storage of game data */
export class StorageClass implements StorageInterface {
  /**
   * @param storage - Web Storage API interface provides access to a particular domain's session or local storage
   */
  constructor(
    private storage: Storage,
  ) {}

  /**
   * Saves an item to storage
   *
   * @param storageItem - stored item
   * @param storageItem.name - name of key in the store
   * @param storageItem.value - the key value in the store
   */
  public save({ name, value }: StorageItem): void {
    this.storage.setItem(name, value);
  }

  /**
   * Get item from storage
   *
   * @param name - name of key in the store
   */
  public get(name: StorageName): StorageValue {
    return this.storage.getItem(name);
  }
}
