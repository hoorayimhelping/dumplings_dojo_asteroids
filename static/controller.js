import Entity from './entity.js'

export default class GameController {
  constructor(canvasElement, width, height) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');

    this.update = this.update.bind(this)
    this.render = this.render.bind(this)

    this.tick = 0

    this.update();
  }


  // game world updates go here 
  update() {
    this.tick++
    window.requestAnimationFrame(this.update);

    this.render();
  }

  // rendering calls go here 
  render() {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    this.context.fillStyle = 'green'
    this.context.fillRect(100, 100, 30, 45)

  }
}
