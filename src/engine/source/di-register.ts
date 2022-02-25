import { container } from '../../di-register';
import { SourceProvider } from './types';
import { FileSource } from './index';

container.registerSingleton<SourceProvider, FileSource>();