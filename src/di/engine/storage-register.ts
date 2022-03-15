import { container } from '../register';
import { StorageInterface } from '../../engine/storage/types';
import { StorageClass } from '../../engine/storage/index';

container.registerSingleton<StorageInterface, StorageClass>();