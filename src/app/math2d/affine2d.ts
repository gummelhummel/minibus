import { Vec2D } from './vec2d';

export class Affine2D {

    public translation = new Vec2D();
    public scale = new Vec2D(1, 1);

    public transform(vec: Vec2D): Vec2D {
        let out = new Vec2D();
        out.x = vec.x * this.scale.x + this.translation.x;
        out.y = vec.y * this.scale.y + this.translation.y;
        return out;
    }
}
