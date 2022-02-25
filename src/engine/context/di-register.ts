import { container } from '../../di-register';
import { DrawingContextProvider } from './types';
import { CanvasContextProvider } from './index';

container.registerSingleton<DrawingContextProvider, CanvasContextProvider>();