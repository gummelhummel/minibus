import { Point } from '../';
export class Square {
    public point: Point;
    public sideLength: number;

    constructor(sideLength: number, point: Point) {
        this.sideLength = sideLength;
        this.point = point;
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(this.point.x, this.point.y, this.sideLength, this.sideLength);
        context.stroke();
    }
}
