import { Affine2D } from '../math2d';

export interface Renderable {
    render(context: CanvasRenderingContext2D, transform: Affine2D)
}
