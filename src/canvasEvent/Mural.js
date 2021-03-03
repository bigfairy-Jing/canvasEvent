


export class Mural {
  constructor(canvas){
    const dpr = window.devicePixelRatio
    canvas.width = parseInt(canvas.style.width) * dpr
    canvas.height = parseInt(canvas.style.height) * dpr

    this.canvas = canvas
    
  }
}