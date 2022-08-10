export default class Entity {
    constructor(coords) {
      this.x = coords.x;
      this.y = coords.y;
      this.width = coords.width;
      this.height = coords.height
      this.alive = false;
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