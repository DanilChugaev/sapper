import { container } from '../register';
import { ContextInterface } from '../../engine/context/types';
import { ContextClass } from '../../engine/context/index';

container.registerSingleton<ContextInterface, ContextClass>();