export class Square {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 300;

  constructor(private ctx: CanvasRenderingContext2D) {}

  moveToPosition(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }
}
