import { Circle, Mural, Rect, Heart, FivePointedStar } from './canvasEvent'
import { EventNames } from './canvasEvent/EventAnglogies'


const canvas = document.querySelector("#canvas") 

const mural = new Mural(canvas)

const circle = new Circle({
  x: 200,
  y: 200,
  radius: 50,
  fillColor: 'pink'
})

const rect = new Rect({
  x: 10,
  y: 10,
  width: 120,
  height: 60,
  fillColor: 'yellow',
})

const heart = new Heart({
  x: 300,
  y: 300,
  heartA: 3,
  fillColor: 'red',
})

const fivePoint = new FivePointedStar({
  x: 200,
  y: 50,
  minSize: 25,
  maxSize: 50,
  fillColor: 'red'
})


circle.on(EventNames.click, ()=>{
  alert('点击了圆')
})

circle.on(EventNames.mouseleave, ()=>{
  console.log('离开了圆形')
})

rect.on(EventNames.click, ()=>{
  alert("点击了矩形")
})

heart.on(EventNames.mouseenter, ()=>{
  console.log('进入了心')
})

fivePoint.on(EventNames.mouseenter, ()=>{
  console.log('进入了五角星')
})

mural.add(circle)
mural.add(rect)
mural.add(heart)
mural.add(fivePoint)