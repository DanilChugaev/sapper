import { container } from '../../di-register';
import { ElementSource } from './types';
import { DomSource } from './index';

container.registerSingleton<ElementSource, DomSource>();