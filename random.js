class Board {
  constructor() {
    this.spaces = this.createBlankBoard();
    this.robots = new Set();
    this.activeRobot = "Robot 1";
  }

  createBlankBoard() {
    const mapInput = [
      ["4", false],
      ["3", false],
      ["2", false],
      ["1", false],
      ["0", false],
    ];
    let spaces = new Map(mapInput);
    for (let i = 4; i >= 0; i--) {
      spaces.set(`${i}`, new Map(mapInput));
    }
    return spaces;
  }

  displaySpaces() {
    for (const row of this.spaces) {
      console.log({ row });
    }
  }

  placeRobot(x, y, robotName) {
    if (!this.checkValidMove(x, y)) return;

    let row = this.spaces.get(`${y}`);
    row.set(`${x}`, robotName);
    this.robots.add(robotName);
  }

  checkValidMove(x, y) {
    if (x > 4 || x < 0) {
      return false;
    }
    if (y > 4 || y < 0) {
      return false;
    }
    return true;
  }
}

const BOARD = new Board();
// console.log({ BOARD });
BOARD.placeRobot("2", "1", "ROBOT2");
BOARD.placeRobot("3", "0", "ROBOT3");
BOARD.displaySpaces();
// console.log(BOARD.spaces.get("0"));
