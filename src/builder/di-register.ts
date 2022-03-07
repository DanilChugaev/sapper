import { container } from '../di-register';
import { BuilderInterface } from './types';
import { BuilderClass } from './index';

container.registerSingleton<BuilderInterface, BuilderClass>();