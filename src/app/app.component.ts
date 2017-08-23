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

    let update = (factor)=>{
      this.angle = (this.angle+90*factor)%360;
      if(this.position<=-10)this.positionInc=1;
      else if(this.position>=10)this.positionInc=-1;
      this.position+=10*factor*this.positionInc/(Math.abs(this.position)<1?1:Math.abs(this.position));
      this.scene.needsRerendering();
    }

    let loop = ()=>{
      let time = Date.now();
      let factor = (time-lastTime)/1000;
      lastTime = time;
      update(factor)
      setTimeout(loop, 25);
    }
    let lastTime = Date.now();
    loop();

    this.scene.addElement(<Renderable>{
      render: (context: CanvasRenderingContext2D) => {
        context.fillStyle="#000000";
        context.beginPath();
        let i = -10;
        context.moveTo((i-3)*24,i*i*i);
        while(i<10){
          i+=1/(Math.abs(i)<1?1:Math.abs(i));
          context.lineTo((i-3)*24, i*i*i)
        }
        context.stroke();
      }
    });

    this.scene.addElement(<Renderable>{
      render: (context: CanvasRenderingContext2D) => {
        let p = this.position;
        let x = (p-3)*24;
        let y_2= p*p;
        let y = y_2*p;
        context.fillStyle="#FF0000";
        context.translate(x, y);
        context.rotate(Math.PI/2+Math.atan(3/24*y_2));
        context.fillRect(-5, -15, 10, 30);
      }
    });

    this.scene.addElement(<Renderable>{
      render: (context: CanvasRenderingContext2D) => {
        let p = -this.position;
        let x = (p-3)*24;
        let y_2= p*p;
        let y = y_2*p;
        context.fillStyle="#775355";
        context.translate(x, y);
        context.rotate(Math.PI/2+Math.atan(3/24*y_2));
        context.fillRect(-5, -15, 10, 30);
      }
    });

    this.scene.addElement(<Renderable>{
      render: (context: CanvasRenderingContext2D) => {
        context.fillStyle="#0000FF";
        context.translate(50,30);
        context.rotate(Math.sign(this.positionInc)*this.angle*Math.PI/180)
        let size=30;
        context.fillRect(-size/2, -size/2, size, size);
      }
    });
  }
}
