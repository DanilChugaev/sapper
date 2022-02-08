import { container } from '../composition';
import { MathGenerator } from './types';
import { Generator } from './index';

container.registerSingleton<MathGenerator, Generator>();