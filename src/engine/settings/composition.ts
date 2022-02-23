import { container } from '../../composition';
import { GameSettings } from './types';
import settings from './index';

container.registerSingleton<GameSettings>(() => settings);
