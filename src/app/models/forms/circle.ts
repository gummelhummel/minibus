import { Point } from '../';
export class Circle {
    public radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    render(context: CanvasRenderingContext2D, point: Point) {
        context.arc(point.x, point.y, this.radius, 0, 2 * Math.PI);
    }
}
