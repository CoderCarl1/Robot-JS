module.exports = class Robot {
  static count = 0;

  constructor(board) {
    Robot.count++;
    this.name = `ROBOT ${Robot.count}`;

    this.posX;
    this.posY;
    this.placed = false;
    this.direction = new Map([
      ["NORTH", false],
      ["SOUTH", false],
      ["EAST", false],
      ["WEST", false],
    ]);
    this.board = board;
  }

  placeRobot(x, y) {
    if (this.checkValidMove(x, y)) {
      // this.board.placeRobot(x, y, this);
      this.setNewPos(x, y);
      console.log("placed?? ", this.placed);
      this.placed = true;
    }
  }

  getCurrentPos() {
    console.log(`${this.name} placed on ROW: ${this.posY}, COL:${this.posX}`);
    return { x: this.posX, y: this.posY };
  }

  setNewPos(x, y) {
    if (this.checkValidMove(x, y)) {
      this.posX = x;
      this.posY = y;
      this.board.placeRobot(x, y, this);
      // return;
    } else {
      console.log("The move would have gone off the table, it was ignored");
    }
  }

  checkValidMove(x, y) {
    return this.board.checkValidMove(x, y);
  }

  moveSelect({ move, commands = null }) {
    console.log("move", move);
    console.log("commands", commands);
    if (move === "PLACE" && commands) {
      const commandsArr = commands.split(",");
      const [x, y, direction] = commandsArr;

      this.setCurrentPos(x, y);
      this.direction.set(direction, true);
    }
  }
};
