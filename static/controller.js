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
        
        this.player = new Player({ x: 100, y: 100, width: 10, height: 10 })
        
        this.bullets = [new Entity({x: -100, y: -100, width: 2, height: 2 })]

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

        if (this.keyboardKeysToListenTo.ARROW_UP) {
            this.player.velocity.y -= this.player.acceleration
            this.player.velocity.y = Math.max(this.player.maxVelocity, this.player.velocity.y)
        }
        else if (this.keyboardKeysToListenTo.ARROW_DOWN){
            this.player.velocity.y += this.player.acceleration
            this.player.velocity.y = Math.min(-this.player.maxVelocity, this.player.velocity.y)
        }
        else if (this.keyboardKeysToListenTo.ARROW_LEFT) {
            //angle changes
        }
        else if (this.keyboardKeysToListenTo.ARROW_RIGHT) {
            //angle changes
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
      this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
      this.context.fillStyle = 'black'
      this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);


      this.context.strokeStyle = this.player.color
      this.context.beginPath();
      this.context.moveTo(this.player.position.x,this.player.position.y);
      this.context.lineTo(this.player.position.x + 50,this.player.position.y + 50);
      this.context.lineTo(this.player.position.x - 50,this.player.position.y + 50);
      this.context.closePath()
      this.context.stroke()
    //   this.context.fill();
    }

    // handle key inputs
    keyDown(event) {
        switch (event.key) {
          case "ArrowLeft":
            console.log('arrow left pressed')
            this.keyboardKeysToListenTo.ARROW_LEFT = true
            break;
          case "ArrowRight":
            console.log('arrow riight pressed')
            this.keyboardKeysToListenTo.ARROW_RIGHT = true
            break;
          case "ArrowUp":
            console.log('arrow up pressed')
            this.keyboardKeysToListenTo.ARROW_UP = true
            break;
          case "ArrowDown":
            console.log('arrow down pressed')
            this.keyboardKeysToListenTo.ARROW_DOWN = true
            break;
          case "Spacebar":
            console.log('spacebar pressed')
            this.keyboardKeysToListenTo.SPACEBAR = true
            break;
          default:
            console.log('default key handler')
            break;
        }
    }

    keyUp(event) {
        switch (event.key) {
            case "ArrowLeft":
              console.log('arrow left pressed')
              this.keyboardKeysToListenTo.ARROW_LEFT = false
              break;
            case "ArrowRight":
              console.log('arrow riight pressed')
              this.keyboardKeysToListenTo.ARROW_RIGHT = false
              break;
            case "ArrowUp":
              console.log('arrow up pressed')
              this.keyboardKeysToListenTo.ARROW_UP = false
              break;
            case "ArrowDown":
              console.log('arrow down pressed')
              this.keyboardKeysToListenTo.ARROW_DOWN = false
              break;
            case "Spacebar":
              console.log('spacebar pressed')
              this.keyboardKeysToListenTo.SPACEBAR = false
              break;
            default:
              console.log('default key handler')
              break;
          }
    }

    fireBullets() {
        for (let counter = 0; counter < this.bullets.length; counter +=1) {
          if (this.bullets[counter].alive === false) {
            this.bullets[counter].alive = true
            this.bullets[counter].x = this.ship.position.x
            this.bullets[counter].y = this.ship.position.y
          }
        }
    }


}