import { container } from '../register';
import { DomInterface } from '../../engine/dom/types';
import { DomClass } from '../../engine/dom/index';

container.registerSingleton<DomInterface, DomClass>();