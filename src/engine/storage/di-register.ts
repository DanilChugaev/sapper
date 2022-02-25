import { container } from '../../di-register';
import { StorageProvider } from './types';
import { DataStorage } from './index';

container.registerSingleton<StorageProvider, DataStorage>();