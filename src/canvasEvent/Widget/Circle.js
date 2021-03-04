import { idToRgba } from '../lib/helper'
import { Base } from './Base'


export class Circle extends Base {

  constructor(props){
    super(props)
    this.options = {
      x: props.x,
      y: props.y,
      radius: props.radius,
      fillColor: props.fillColor || '#fff',
      strokeColor: props.strokeColr || '#000',
      strokeWidth: props.strokeWidth || 1
    }
  }

  draw(ctx, hideCtx){
    const {x, y, radius, fillColor, strokeColor,  strokeWidth} = this.options
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.strokeColr = strokeColor
    ctx.linWidth = strokeWidth
    ctx.arc(x,y,radius, 0 , Math.PI * 2)
    ctx.fill()
    ctx.restore()

    const [r, g , b , a] = idToRgba(this.id)
    console.log(r, g , b , a)
    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.lineWidth = strokeWidth;
    hideCtx.arc(x, y, radius, 0, Math.PI * 2);
    hideCtx.fill();
    hideCtx.restore();

  }


}