import { container } from '../../di-register';
import { MathInterface } from './types';
import { MathClass } from './index';

container.registerSingleton<MathInterface, MathClass>();