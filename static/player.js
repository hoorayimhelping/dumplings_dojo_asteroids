import Entity from './entity.js'

export default class Player extends Entity {
    constructor(coords) {
        super(coords)
        this.color = 'white'
        this.acceleration = 0.1
        this.velocity = {
          x: 0,
          y: 0
        }
        this.angle = 0
        this.position = {
          x: 100,
          y: 100
        }

      this.maxVelocity = 2
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