import { Component, OnInit, ViewChild, HostListener,ElementRef } from '@angular/core';
import { Renderable } from '../renderable';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @ViewChild("canvas") canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  private context:CanvasRenderingContext2D;

  private _needsRerendering = true;

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d");
  }

  @HostListener("window:resize", ["$event"])
  private onWindowResized(event){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.needsRerendering();
  }

  public needsRerendering(){
    this._needsRerendering = true;
  }

  public render(){
    if(this._needsRerendering){
      this._needsRerendering = false;
      this.renderableMap.forEach((v)=>{
        v.render(this.context, null);
      })
    }
  }

  // servicePart
  private renderableMap:Map<number, Renderable>

  public addElement(renderable:Renderable){
    this.renderableMap.set(renderable.id, renderable);
    this.needsRerendering();
  }

  public removeElement(id:number){
    this.renderableMap.delete(id);
    this.needsRerendering();
  }
}