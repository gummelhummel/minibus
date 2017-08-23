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

  angle=0;
  position=0;
  positionInc = 1;

  ngOnInit() {
    setInterval(()=>{
      this.angle = (this.angle+5)%360;
      if(this.position<=-10)this.positionInc=1;
      else if(this.position>=10)this.positionInc=-1;
      this.position+=this.positionInc/(Math.abs(this.position)<1?1:Math.abs(this.position))*0.5;
      this.scene.needsRerendering();
    }, 100);

    this.scene.addElement(<Renderable>{
      render: (context: CanvasRenderingContext2D) => {
        context.beginPath();
        let i = -10;
        context.moveTo((i-3)*24,i*i*i);
        while(i<10){
          i+=1/(Math.abs(i)<1?1:Math.abs(i))*0.5;
          context.lineTo((i-3)*24, i*i*i)
        }
        context.stroke();
        context.fillStyle="#FF0000";
        context.translate((this.position-3)*24, this.position*this.position*this.position)
        context.fillRect(-5, -5, 10, 10);
      }
    });

    this.scene.addElement(<Renderable>{
      render: (context: CanvasRenderingContext2D) => {
        context.fillStyle="#0000FF";
        context.translate(50,30);
        context.rotate(this.angle*Math.PI/180)
        let size=30;
        context.fillRect(-size/2, -size/2, size, size);
      }
    });
  }
}
