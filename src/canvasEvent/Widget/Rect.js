import { idToRgba } from '../lib/helper';
import { Base } from './Base';

export class Rect extends Base {
  constructor(props) {
    super(props);
    this.options = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      radius: props.radius,
      fillColor: props.fillColor || '#fff',
      strokeColor: props.strokeColr || '#000',
      strokeWidth: props.strokeWidth || 1
    };
  }

  draw(ctx, hideCtx) {
    const { x, y, width, height, fillColor, strokeColor, strokeWidth } = this.options;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillColor;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const [ r, g, b, a ] = idToRgba(this.id);

    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.rect(x, y, width, height);
    hideCtx.fill();
    hideCtx.stroke();
    hideCtx.restore();
  }
}
