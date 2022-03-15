import { container } from '../register';
import { UIInterface } from '../../engine/ui/types';
import { UIClass } from '../../engine/ui/index';

container.registerSingleton<UIInterface, UIClass>();