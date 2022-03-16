import { DomInterface } from 'just-engine/src/dom/types';
import { DomClass } from 'just-engine/src/dom/index';

import { container } from '../register';

container.registerSingleton<DomInterface, DomClass>();