import { container } from '../../di-register';
import { ContextInterface } from './types';
import { ContextClass } from './index';

container.registerSingleton<ContextInterface, ContextClass>();