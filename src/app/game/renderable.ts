export interface Renderable {
    id: number;
    render(context: CanvasRenderingContext2D, matrix)
}
