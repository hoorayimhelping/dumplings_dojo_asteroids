import Entity from './entity.js'
import Player from './player.js'

export default class GameController {
    constructor(canvasElement, width, height) {
      this.canvas = canvasElement;
      this.context = this.canvas.getContext('2d');

      this.update = this.update.bind(this)
      this.render = this.render.bind(this)
      this.keyDown = this.keyDown.bind(this)
      this.keyUp = this.keyUp.bind(this)
      this.fireBullets = this.fireBullets.bind(this)
      
      this.tick = 0
      
      this.player = new Player()
      this.player.position.x = this.canvas.clientWidth / 2
      this.player.position.y = this.canvas.clientHeight / 2
      
      this.fillColors = [
        'red',
        'green',
        'dodgerblue',
        'yellow',
        'orange',
        'purple',
      ]
      this.bullets = [
        new Entity({x: -100, y: -100, width: 20, height: 20 }), 
        new Entity({x: -100, y: -100, width: 20, height: 20 }), 
        new Entity({x: -100, y: -100, width: 20, height: 20 }), 
        new Entity({x: -100, y: -100, width: 20, height: 20 }), 
        new Entity({x: -100, y: -100, width: 20, height: 20 }), 
        new Entity({x: -100, y: -100, width: 20, height: 20 })]

      this.keyboardKeysToListenTo = {
        ARROW_UP: false,
        ARROW_DOWN: false,
        ARROW_LEFT: false,
        ARROW_RIGHT: false,
        SPACEBAR: false
      }

      this.update();
    }


    // game world updates go here 
    update() {
      this.tick++
      window.requestAnimationFrame(this.update);
      // console.log(this.player.angle, Math.sin(this.player.angle), Math.cos(this.player.angle))
      if (this.keyboardKeysToListenTo.ARROW_UP) {
        this.player.velocity.y += this.player.acceleration
        this.player.velocity.y = Math.min(this.player.maxVelocity, this.player.velocity.y)
      }
      else if (this.keyboardKeysToListenTo.ARROW_DOWN){
        this.player.velocity.y -= this.player.acceleration
        this.player.velocity.y = Math.max(-this.player.maxVelocity, this.player.velocity.y)
      }
      else if (this.keyboardKeysToListenTo.ARROW_LEFT) {
        this.player.angle -= this.player.rotationalAcceleration
        //this.player.position.x = (this.player.position.x*Math.cos(this.player.angle)) - (this.player.position.y*Math.sin(this.player.angle))
        //this.player.position.y = (this.player.position.x*Math.sin(this.player.angle)) + (this.player.position.y*Math.cos(this.player.angle))
      }
      else if (this.keyboardKeysToListenTo.ARROW_RIGHT) {
        this.player.angle += this.player.rotationalAcceleration
      }
      
      this.player.position.y -= this.player.velocity.y
      this.player.position.x -= this.player.velocity.x

      if (this.player.position.y <= 0) {
        this.player.position.y = this.canvas.clientHeight

      } else if (this.player.position.y >= this.canvas.clientHeight) {
        this.player.position.y = 0
      }

      if (this.keyboardKeysToListenTo.SPACEBAR) {
        this.fireBullets()
      }


      this.render();
    }

    // rendering calls go here 
    render() {
      this.context.setTransform(1,0,0,1,0,0); 
      this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

      this.context.fillStyle = 'black'
      this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);


      this.context.strokeStyle = this.player.color

      this.context.translate(this.player.position.x, this.player.position.y + this.player.yChange);
      this.context.rotate(this.player.angle * Math.PI / 180); // rotate canvas
      this.context.translate(-this.player.position.x, -this.player.position.y);
      
      this.context.beginPath();

      this.context.moveTo(this.player.position.x,this.player.position.y);
      this.context.lineTo(this.player.position.x - 10,this.player.position.y - 35);
      this.context.lineTo(this.player.position.x + 10,this.player.position.y - 35);

      this.context.closePath()
      // Complete draw
      this.context.stroke()
      this.context.restore();

      for (let counter = 0; counter < this.bullets.length; counter +=1) {
        this.context.fillStyle = this.fillColors[counter]
        this.context.fillRect(this.bullets[counter].x, this.bullets[counter].y, this.bullets[counter].width, this.bullets[counter].height)
      }
     }

    // handle key inputs
    keyDown(event) {
      switch (event.key) {
        case "ArrowLeft":
          this.keyboardKeysToListenTo.ARROW_LEFT = true
          break;
        case "ArrowRight":
          this.keyboardKeysToListenTo.ARROW_RIGHT = true
          break;
        case "ArrowUp":
          this.keyboardKeysToListenTo.ARROW_UP = true
          break;
        case "ArrowDown":
          this.keyboardKeysToListenTo.ARROW_DOWN = true
          break;
        case " ":
          this.keyboardKeysToListenTo.SPACEBAR = true
          break;
        default:
          break;
      }
    }

    keyUp(event) {
      switch (event.key) {
        case "ArrowLeft":
          this.keyboardKeysToListenTo.ARROW_LEFT = false
          break;
        case "ArrowRight":
          this.keyboardKeysToListenTo.ARROW_RIGHT = false
          break;
        case "ArrowUp":

          this.keyboardKeysToListenTo.ARROW_UP = false
          break;
        case "ArrowDown":
          this.keyboardKeysToListenTo.ARROW_DOWN = false
          break;
        case " ":
          this.keyboardKeysToListenTo.SPACEBAR = false
          break;
        default:
          break;
        }
    }

    fireBullets() {

      for (let counter = 0; counter < this.bullets.length; counter +=1) {
        if (this.bullets[counter].alive === false) {
          this.bullets[counter].alive = true
          this.bullets[counter].x = this.player.position.x + 20 * counter
          this.bullets[counter].y = this.player.position.y + 20 * counter

          console.log("firing from  ",this.player.position.x, this.player.position.y )
        }
      }
    }


}