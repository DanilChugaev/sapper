import { container } from '../../composition';
import { SourceProvider } from './types';
import { FileSource } from './index';

container.registerSingleton<SourceProvider, FileSource>();