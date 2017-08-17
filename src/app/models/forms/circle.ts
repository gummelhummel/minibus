import { Point } from '../';
export class Circle {
    public radius: number;
    public point: Point;

    constructor(radius: number, point: Point) {
        this.radius = radius;
        this.point = point;
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
    }
}
