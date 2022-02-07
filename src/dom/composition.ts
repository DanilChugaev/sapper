import { container } from '../composition';
import { ElementSource } from './types';
import { DomSource } from './index';

container.registerSingleton<ElementSource, DomSource>();