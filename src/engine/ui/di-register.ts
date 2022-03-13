import { container } from '../../di-register';
import { UIInterface } from './types';
import { UIClass } from './index';

container.registerSingleton<UIInterface, UIClass>();