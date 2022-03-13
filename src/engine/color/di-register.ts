import { container } from '../../di-register';
import { ColorInterface } from './types';
import { ColorClass } from './index';

container.registerSingleton<ColorInterface, ColorClass>();