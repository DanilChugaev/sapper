import { container } from '../register';
import { SourceInterface } from '../../engine/source/types';
import { SourceClass } from '../../engine/source/index';

container.registerSingleton<SourceInterface, SourceClass>();