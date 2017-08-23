import { Component, OnInit, ViewChild, HostListener, ElementRef, NgZone } from '@angular/core';
import { Renderable } from '../renderable';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @ViewChild("canvas") canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private renderableMap = new Set<Renderable>();
  private _needsRerendering = true;

  constructor(public zone: NgZone) { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d");
    start(this);
    this.resize();
    this.zone.runOutsideAngular(() => {
      loopSimple();
    });
  }

  @HostListener("window:resize", ["$event"])
  private onWindowResized(event) {
    this.resize();
  }

  public resize(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.needsRerendering();
  }

  public needsRerendering() {
    this._needsRerendering = true;
  }

  public render() {
    if (this._needsRerendering) {
      this._needsRerendering = false;
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
      this.renderableMap.forEach((v) => {
        this.context.setTransform(1, 0, 0, -1, this.canvas.width / 2, this.canvas.height / 2)
        v.render(this.context);
      })   
    }
  }

  // servicePart


  public addElement(renderable: Renderable) {
    this.renderableMap.add(renderable);
    this.needsRerendering();
  }

  public removeElement(renderable: Renderable) {
    this.renderableMap.delete(renderable);
    this.needsRerendering();
  }
}


var scene: SceneComponent;

function start(pScene: SceneComponent) {
  scene = pScene;
}

function loopSimple() {
  scene.render();
  requestAnimationFrame(loopSimple);
}