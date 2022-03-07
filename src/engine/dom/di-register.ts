import { container } from '../../di-register';
import { DomInterface } from './types';
import { DomClass } from './index';

container.registerSingleton<DomInterface, DomClass>();