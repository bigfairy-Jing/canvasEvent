import { Base } from './Base'


export default class Circle {

  constructor(props){
    super()
    this.options = {
      fillColor: props.fillColor || '#fff',
      strokeColor: props.strokeColr || '#000',
      strokeWidth: props.strokeWidth || 1
    }
  }

  draw(ctx, hideCtx){
    const {x, y, radius} = this.props
    const {fillColor, strokeColor,  strokeWidth} = this.options

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.strokeColr = strokeColor
    ctx.linWidth = strokeWidth
    ctx.arc(x,y,radius, 0 , Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.restore()

    osCtx.save();
    osCtx.beginPath();
    osCtx.fillStyle = fillColor;
    osCtx.strokeStyle = strokeColor;
    osCtx.lineWidth = strokeWidth;
    osCtx.arc(x, y, radius, 0, Math.PI * 2);
    osCtx.fill();
    osCtx.stroke();
    osCtx.restore();

  }


}