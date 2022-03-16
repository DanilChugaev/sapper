import { MathInterface } from 'just-engine/src/math/types';
import { MathClass } from 'just-engine/src/math/index';

import { container } from '../register';

container.registerSingleton<MathInterface, MathClass>();