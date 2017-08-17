import { Vec2D } from './vec2d';

export class Affine2D {

    public translation = new Vec2D();
    public scale = new Vec2D(1, 1);
    public axis = new Vec2D(1, 1);

    public transformPoint(vec: Vec2D): Vec2D {
        let out = this.transformVector(vec);
        out.x = out.x*this.axis.x+this.translation.x;
        out.y = out.y*this.axis.y+this.translation.y;
        return out;
    }

    public transformVector(vec: Vec2D): Vec2D {
        let out = new Vec2D();
        out.x = vec.x * this.scale.x;
        out.y = vec.y * this.scale.y;
        return out;
    }
}
