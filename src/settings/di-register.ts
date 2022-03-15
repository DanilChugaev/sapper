import { container } from '../di-register';
import { GameSettings } from './types';
import settings from './index';

container.registerSingleton<GameSettings>(() => settings);
