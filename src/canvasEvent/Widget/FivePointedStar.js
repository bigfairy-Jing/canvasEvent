import { idToRgba } from '../lib/helper'
import { Base } from './Base'


export class FivePointedStar extends Base {

  constructor(props) {
    super(props)
    this.options = {
      x: props.x,
      y: props.y,
      minSize: props.minSize,
      maxSize: props.maxSize,
      fillColor: props.fillColor || '#fff',
    }
  }

  drawFivePointedStar(ctx, X, Y, maxSize, minSize) {
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        Math.cos(((18 + i * 72) * Math.PI) / 180) * maxSize + X,
        -Math.sin(((18 + i * 72) * Math.PI) / 180) * maxSize + Y
      );
      ctx.lineTo(
        Math.cos(((54 + i * 72) * Math.PI) / 180) * minSize + X,
        -Math.sin(((54 + i * 72) * Math.PI) / 180) * minSize + Y
      );
    }
    ctx.closePath();
  }

  draw(ctx, hideCtx) {
    const {
      x,
      y,
      maxSize,
      minSize,
      fillColor
    } = this.options
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = fillColor
    this.drawFivePointedStar(ctx, x, y, maxSize, minSize)
    ctx.fill()
    ctx.stroke()
    ctx.restore()

    const [r, g, b, a] = idToRgba(this.getId())

    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.drawFivePointedStar(hideCtx, x, y, maxSize, minSize)
    hideCtx.fill();
    hideCtx.stroke();
    hideCtx.restore();
  }

}