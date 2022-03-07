import { container } from '../../di-register';
import { StorageInterface } from './types';
import { StorageClass } from './index';

container.registerSingleton<StorageInterface, StorageClass>();