import { container } from '../../di-register';
import { MathGenerator } from './types';
import { Generator } from './index';

container.registerSingleton<MathGenerator, Generator>();