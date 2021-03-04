import { Circle, Mural, Rect, Heart, FivePointedStar, Polygon } from './canvasEvent';
import { EventNames } from './canvasEvent/EventAnglogies';

const canvas = document.querySelector('#canvas');

const mural = new Mural(canvas);

const circle = new Circle({
  x: 350,
  y: 50,
  radius: 50,
  fillColor: 'pink'
});

const rect = new Rect({
  x: 10,
  y: 10,
  width: 120,
  height: 60,
  fillColor: 'yellow'
});

const heart = new Heart({
  x: 200,
  y: 50,
  heartA: 3,
  fillColor: 'red'
});

const polygon = new Polygon({
  x:500,
  y: 50,
  n: 8,
  size: 50,
  fillColor: 'blue',
  isAnimation: true
})

const fivePoint = new FivePointedStar({
  x: 50,
  y: 200,
  minSize: 25,
  maxSize: 50,
  fillColor: 'red',
  isAnimation: true
});

rect.on(EventNames.click, () => {
  alert('点击了矩形');
});

heart.on(EventNames.mouseenter, () => {
  console.log('进入心');
});
heart.on(EventNames.mouseleave, () => {
  console.log('离开心');
});

circle.on(EventNames.click, () => {
  alert('点击了圆');
});

circle.on(EventNames.mouseleave, () => {
  console.log('离开了圆形');
});


polygon.on(EventNames.mousedown, (e) => {
  console.log(polygon)
  let baseX = e.pageX
  let baseY = e.pageY
  document.onmousemove = (event) =>{
    const moveX = event.pageX - baseX
    const moveY = event.pageY - baseY
    baseX = event.pageX
    baseY = event.pageY
    polygon.options.x = polygon.options.x + moveX
    polygon.options.y = polygon.options.y + moveY
    mural.add(polygon);
  }
})

fivePoint.on(EventNames.mouseenter, () => {
  console.log('进入了五角星');
});

fivePoint.on(EventNames.mouseleave, () => {
  console.log('离开了五角星');
});

fivePoint.on(EventNames.mousedown, (e) => {
  let baseX = e.pageX
  let baseY = e.pageY
  document.onmousemove = (event) =>{
    const moveX = event.pageX - baseX
    const moveY = event.pageY - baseY
    baseX = event.pageX
    baseY = event.pageY
    fivePoint.options.x = fivePoint.options.x + moveX
    fivePoint.options.y = fivePoint.options.y + moveY
    mural.add(fivePoint, true);
  }
})


document.addEventListener('mouseup', function() {
  document.onmousemove = null
}, false)

mural.add(circle);
mural.add(rect);
mural.add(heart);
mural.add(polygon);
mural.add(fivePoint);
