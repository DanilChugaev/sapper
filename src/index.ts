import { container } from './composition/index';
import { Game } from './game/types';

import './index.scss';

const sapper = container.get<Game>();

sapper.init();