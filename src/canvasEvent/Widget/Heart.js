import {
  idToRgba
} from '../lib/helper'
import {
  Base
} from './Base'


export class Heart extends Base {

  constructor(props) {
    super(props)
    this.options = {
      x: props.x,
      y: props.y,
      heartA: props.heartA,
      fillColor: props.fillColor || '#fff',
    }
    this.options.vertices = this.getVertices(props.heartA)
  }

  getVertices(a) {
    const res = []
    for (let i = 0; i < 50; i++) {
      let step = i / 50 * (Math.PI * 2); //设置心上面两点之间的角度，具体分成多少份
      let vector = {
        x: a * (16 * Math.pow(Math.sin(step), 3)),
        y: a * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
      }
      res.push(vector);
    }
    return res
  }

  draw(ctx, hideCtx) {
    const {
      x,
      y,
      vertices,
      fillColor,
    } = this.options
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.translate(x,y);
    ctx.rotate(Math.PI);
    for(let i=0; i<50; i++) {
      let vector = vertices[i];
      ctx.lineTo(vector.x, vector.y);
    }
    ctx.fill()
    ctx.restore()

    const [r, g, b, a] = idToRgba(this.getId())

    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.translate(x,y);
    hideCtx.rotate(Math.PI);
    for(let i=0; i<50; i++) {
      let vector = vertices[i];
      hideCtx.lineTo(vector.x, vector.y);
    }
    hideCtx.fill();
    hideCtx.restore();
  }
}