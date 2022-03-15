import { container } from './di/register';
import { GameInterface } from './game/types';

import './img/bomb.png';
import './img/flag.png';

import './index.scss';

const sapper = container.get<GameInterface>();

sapper.init();