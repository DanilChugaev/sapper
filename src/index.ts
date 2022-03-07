import { container } from './di-register';
import { GameInterface } from './game/types';

import './index.scss';

const sapper = container.get<GameInterface>();

sapper.init();