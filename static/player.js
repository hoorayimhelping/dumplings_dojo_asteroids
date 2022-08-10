export default class Player {
    constructor() {
        this.color = 'white'
        this.acceleration = 0.1
        this.shipHeight = 15
        this.shipWidth = 10
        
        this.velocity = {
          x: 0,
          y: 0
        }
        this.rotationalAcceleration = 1
        this.angle = 180
        this.position = {
          x: 100,
          y: 100
        }
        this.shipTop = this.position + this.shipHeight
        this.shipRight = this.position + (this.shipWidth / 2)
        this.shipLeft = this.position - (this.shipWidth / 2)

        this.xChange = 10
        this.yChange = 35


      this.maxVelocity = 5
    }

    // override
    update() {}

    getCoords() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      }
    }
}





// bucky is updating this alexalexalex
// sahas

// I can edit
// hooray for liveshare

// Try to handle this in browser