import { Component, ViewChild } from '@angular/core';
import { SceneComponent, Renderable } from './game';
import { Affine2D,Vec2D } from './math2d';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("scene") scene: SceneComponent;

  ngOnInit() {
    this.scene.addElement(<Renderable>{
      render: (contex: CanvasRenderingContext2D, affine: Affine2D) => {
        
       
        let bounds= new Vec2D(10,10); //hier muss nur scale angewendet werden
        let point= affine.transform(new Vec2D(0-bounds.x/2, 0-bounds.y/2));
        console.log(point)
        contex.fillRect(point.x, point.y, bounds.x, bounds.y);
      }
    });

    this.scene.addElement(<Renderable>{
      render: (contex: CanvasRenderingContext2D, affine: Affine2D) => {
        
       
        let bounds= new Vec2D(10,10); //hier muss nur scale angewendet werden
        let point= affine.transform(new Vec2D(50-bounds.x/2, 20-bounds.y/2));
        console.log(point)
        contex.fillRect(point.x, point.y, bounds.x, bounds.y);
      }
    });
  }
}
