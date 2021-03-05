import { idToRgba } from '../lib/helper';
import { Base } from './Base';

// n:表示几边形
// x,y:表示n边形中心坐标
// size:表示n边形大小；(中心到顶点的大小)

export class Polygon extends Base {
  constructor(props) {
    super(props);
    this.options = {
      x: props.x,
      y: props.y,
      n: props.n,
      size: props.size,
      fillColor: props.fillColor || '#fff'
    };
  }

  drawPolygon(ctx, n, dx, dy, size) {
    const degree = 2 * Math.PI / n;
    for (let i = 0; i < n; i++) {
      let x = Math.cos(i * degree);
      let y = Math.sin(i * degree);
      ctx.lineTo(x * size + dx, y * size + dy);
    }
    ctx.closePath();
  }

  draw(ctx, hideCtx) {
    const { x, y, n, size, fillColor } = this.options;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    this.drawPolygon(ctx, n, x, y, size);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const [ r, g, b, a ] = idToRgba(this.getId());

    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.drawPolygon(hideCtx, n, x, y, size);
    hideCtx.fill();
    hideCtx.stroke();
    hideCtx.restore();
  }
}
