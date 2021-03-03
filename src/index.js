import { Circle, Mural, Rect } from './canvasEvent'
import { EventNames } from './canvasEvent/EventAnglogies'


const canvas = document.querySelector("#canvas") 

const mural = new Mural(canvas)

const circle = new Circle({
  x: 300,
  y: 300,
  radius: 100,
  fillColor: 'pink'
})

const rect = new Rect({
  x: 10,
  y: 10,
  width: 250,
  height: 175,
  fillColor: 'yellow',
})


circle.on(EventNames.click, ()=>{
  alert('点击了圆')
})

circle.on(EventNames.mouseleave, ()=>{
  console.log('离开')
})

rect.on(EventNames.click, ()=>{
  alert("点击了矩形")
})

mural.add(circle)
mural.add(rect)