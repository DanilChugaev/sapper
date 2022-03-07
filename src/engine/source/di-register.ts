import { container } from '../../di-register';
import { SourceInterface } from './types';
import { SourceClass } from './index';

container.registerSingleton<SourceInterface, SourceClass>();