import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Renderable } from '../renderable';
import { Affine2D } from '../../math2d';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @ViewChild("canvas") canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  private transform = new Affine2D();
  private _needsRerendering = true;

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d");

    this.render();    
  }

  @HostListener("window:resize", ["$event"])
  private onWindowResized(event) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.needsRerendering();
  }

  public needsRerendering() {
    this._needsRerendering = true;
  }

  ngDoCheck() {
    this.render();
  }

  public render() {
    if (this._needsRerendering) {
      this._needsRerendering = false;
      this.transform.translation.x = this.canvas.width/2;
      this.transform.translation.y = this.canvas.height/2;
      this.transform.scale.x = 1;
      this.transform.scale.y = -1;
        this.renderableMap.forEach((v) => {
          v.render(this.context, this.transform);
        })
    }
  }

  // servicePart
  private renderableMap = new Set<Renderable>();

  public addElement(renderable: Renderable) {
    this.renderableMap.add(renderable);
    this.needsRerendering();
  }

  public removeElement(renderable: Renderable) {
    this.renderableMap.delete(renderable);
    this.needsRerendering();
  }
}