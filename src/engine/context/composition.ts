import { container } from '../../composition';
import { DrawingContextProvider } from './types';
import { CanvasContextProvider } from './index';

container.registerSingleton<DrawingContextProvider, CanvasContextProvider>();