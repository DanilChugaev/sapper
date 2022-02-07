import { container } from '../composition';
import { StorageProvider } from './types';
import { DataStorage } from './index';

container.registerSingleton<StorageProvider, DataStorage>();