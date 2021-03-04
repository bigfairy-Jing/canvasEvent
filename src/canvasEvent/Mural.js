import { EventAnglogies, ActionTypes } from './EventAnglogies';
import { rgbaToId } from './lib/helper';

export class Mural {
  constructor(canvas) {
    // canvas 在不同dpr屏幕上的模糊问题
    const dpr = window.devicePixelRatio;
    canvas.width = parseInt(canvas.style.width) * dpr;
    canvas.height = parseInt(canvas.style.height) * dpr;



    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(dpr, dpr); // 根据dpr 缩放画布

    // 创建一个隐藏的ctx 如果无法使用这个API可以画在一个隐藏的canvas上
    this.hideCtx = this.createHideCtx(canvas.width, canvas.height, dpr)


    this.dpr = dpr;
    // 需要即时移动的canvas隐藏画布
    this.moveHideCtxMap = new Map()

    this.canvas.addEventListener('mousedown', this.handleCreator(ActionTypes.down));
    this.canvas.addEventListener('mouseup', this.handleCreator(ActionTypes.up));
    this.canvas.addEventListener('mousemove', this.handleCreator(ActionTypes.move));

    this.widgets = new Set(); // 将所有静态部件放入Set容器中
    this.widgetsMap = new Map()

    this.eventAnglogies = new EventAnglogies();
  }

  createHideCtx(width, height, dpr) {
    const hidecanvas = new OffscreenCanvas(width, height);
    const hideCtx = hidecanvas.getContext('2d');
    hideCtx.scale(dpr, dpr);
    return hideCtx
  }


  add(widget, isOld = false) {
    // 这里代表了动画，或者其他，就是事件已经绑定好了，只是一些位置发生改变
    if(isOld){
      this.drawAll(widget)
      return
    }
    const id = widget.getId();
    const isAnimation = widget.getIsAnimation()
    this.eventAnglogies.addListeners(id, widget.getListeners());
    this.widgets.add(id);
    this.widgetsMap.set(id, widget)
    let hideCtx = this.hideCtx

    // 如果该widget需要移动的话或者覆盖, 存在的话加上，不存在的话new， 防止用户多次add
    if (isAnimation) {
      if (this.moveHideCtxMap.get(id)) hideCtx = this.moveHideCtxMap.get(id)
      else {
        hideCtx = this.createHideCtx(this.canvas.width, this.canvas.height, this.dpr)
        this.moveHideCtxMap.set(id, hideCtx)
      }
    }

    widget.draw(this.ctx, hideCtx);
  }

  handleCreator = (type) => (ev) => {
    const x = ev.offsetX;
    const y = ev.offsetY;
    const idSet = this.getHideIdSet(x, y);
    // 不能在这里遍历idSet
    this.eventAnglogies.dispatchAction({ type, idSet }, ev)
  };

  getHideIdSet(x, y) {
    const rgba = [...this.hideCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data];
    const staticRgbaToId = rgbaToId(rgba);

    const staticId = this.widgets.has(staticRgbaToId) ? staticRgbaToId :[]

    let animationId = []
    
    this.moveHideCtxMap.forEach((hCtx, id)=>{
      if(rgbaToId([...hCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data]) === id){
        animationId.push(id)
      }
    })
    // console.log(animationId,this.moveHideCtxMap, '--->')
    // 获取到所有当前位置的关于动静态id的组合
    return new Set(animationId.concat(staticId))
  }

  // 产生动画重绘所有的图案
  drawAll(moveWidget){
    // 清空视口画布
    this.ctx.clearRect(0, 0 , this.canvas.height, this.canvas.width)
    this.widgetsMap.forEach((widget, id)=>{
      const hideCtx = this.moveHideCtxMap.get(id) || this.hideCtx
      // 如果不是当前widget 直接画，如果是当前widget 清空隐藏的Rect
      // 因为重新draw之后又会有一次hideCtx记录
      if(moveWidget !== widget) widget.draw(this.ctx, hideCtx);
      else hideCtx.clearRect(0, 0 , this.canvas.height, this.canvas.width)
    })
    const moveId = moveWidget.getId();
    const moveCtx = this.moveHideCtxMap.get(moveId)
    moveWidget.draw(this.ctx, moveCtx)
  }
}