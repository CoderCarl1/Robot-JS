const colors = require("colors/safe");

module.exports = class Robot {
  static count = 0;

  constructor(board) {
    Robot.count++;
    this.name = `ROBOT ${Robot.count}`;

    this.posX;
    this.posY;
    this.placed = false;
    this.direction;
    this.board = board;
  }

  placeRobot(x, y, direction) {
    if (this.placed) {
      console.log(colors.red('ROBOT PLACED ALREADY'));
      return;
    }

      this.setNewPos(x, y);
      this.placed = true;
      this.direction = direction;
      // this.getCurrentPos();
  }

  moveRobot(){
    let newY = this.posY;
    let newX = this.posX;

    switch(true){
      case this.direction === 'NORTH':
        newY = this.posY + 1
        break;
      case this.direction === 'SOUTH':
        newY = this.posY - 1
        break;
      case this.direction === 'EAST':
        newX = this.posX + 1
        break;
      case this.direction === 'WEST':
        newX = this.posX - 1
        break;
    }

    this.setNewPos(newX, newY);

  }

  getCurrentPos() {
    console.log(colors.yellow(`${this.posX},${this.posY},${this.direction}`));
  }

  setNewPos(x, y) {
    if (this.checkValidMove(x, y)) {
      this.board.placeRobot(x, y, this);
      this.posX = x;
      this.posY = y;
      // return;
    } else {
      console.log(colors.red("MOVE IGNORED: The robot would have gone off the table"));
    }
  }

  checkValidMove(x, y) {
    return this.board.checkValidMove(x, y);
  }

  rotate(rotation){
    switch(this.direction){
      case "NORTH":
        this.direction = rotation === -1 ? 'WEST' : 'EAST';
        break;
      case "SOUTH":
        this.direction = rotation === -1 ? 'EAST' : 'WEST';
        break;
      case "EAST":
        this.direction = rotation === -1 ? 'NORTH' : 'SOUTH';
        break;
      case "WEST":
        this.direction = rotation === -1 ? 'SOUTH' : 'NORTH';
        break;
    }
  }
};
