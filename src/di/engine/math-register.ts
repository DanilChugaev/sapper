import { container } from '../register';
import { MathInterface } from '../../engine/math/types';
import { MathClass } from '../../engine/math/index';

container.registerSingleton<MathInterface, MathClass>();