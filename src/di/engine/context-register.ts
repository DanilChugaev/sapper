import { ContextInterface } from 'just-engine/src/context/types';
import { ContextClass } from 'just-engine/src/context/index';

import { container } from '../register';

container.registerSingleton<ContextInterface, ContextClass>();