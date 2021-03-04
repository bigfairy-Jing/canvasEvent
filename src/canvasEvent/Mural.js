import { EventAnglogies, ActionTypes } from './EventAnglogies';
import { rgbaToId } from './lib/helper';

export class Mural {
  constructor(canvas) {
    // canvas 在不同dpr屏幕上的模糊问题
    const dpr = window.devicePixelRatio;
    canvas.width = parseInt(canvas.style.width) * dpr;
    canvas.height = parseInt(canvas.style.height) * dpr;

    // 如果无法使用这个API可以画在一个隐藏的canvas上
    this.hidecanvas = new OffscreenCanvas(canvas.width, canvas.height);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.hideCtx = this.hidecanvas.getContext('2d');
    this.ctx.scale(dpr, dpr); // 根据dpr 缩放画布
    this.hideCtx.scale(dpr, dpr); // 根据dpr 缩放画布
    this.dpr = dpr;

    this.canvas.addEventListener('mousedown', this.handleCreator(ActionTypes.down));
    this.canvas.addEventListener('mouseup', this.handleCreator(ActionTypes.up));
    this.canvas.addEventListener('mousemove', this.handleCreator(ActionTypes.move));

    this.widgets = new Set(); // 将所有的部件放入Set容器中

    this.eventAnglogies = new EventAnglogies();
  }

  add(widget) {
    const id = widget.getId();
    this.eventAnglogies.addListeners(id, widget.getListeners());
    this.widgets.add(id);
    widget.draw(this.ctx, this.hideCtx);
  }

  handleCreator = (type) => (ev) => {
    const x = ev.offsetX;
    const y = ev.offsetY;
    const id = this.getHideId(x, y);
    this.eventAnglogies.addAction({ type, id }, ev);
  };

  getHideId(x, y) {
    const rgba = [ ...this.hideCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data ];

    const id = rgbaToId(rgba);

    return this.widgets.has(id) ? id : undefined;
  }
}
