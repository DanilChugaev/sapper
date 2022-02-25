import { container } from './di-register';
import { Game } from './game/types';

import './index.scss';

const sapper = container.get<Game>();

sapper.init();