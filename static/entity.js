export default class Entity {
  constructor(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = coords.width;
    this.height = coords.height;
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
