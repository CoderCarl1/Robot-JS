module.exports = class Board {
  constructor() {
    this.spaces = this.createBlankBoard();
    this.robots = new Set();
    this.activeRobot = "Robot 1";
  }

  createBlankBoard() {
    const mapInput = [
      ["4", [null]],
      ["3", [null]],
      ["2", [null]],
      ["1", [null]],
      ["0", [null]],
    ];
    let spaces = new Map(mapInput);
    for (let i = 4; i >= 0; i--) {
      spaces.set(`${i}`, new Map(mapInput));
    }
    return spaces;
  }

  displaySpaces() {
    for (const row of this.spaces) {
      for (const col of row) {
        console.log(col);
      }
    }
  }

  placeRobot(x, y, robot) {
    // check valid & ignore if not
    if (x == undefined || y == undefined || robot == undefined) return;
    if (!this.checkValidMove(x, y)) return;
    // remove robot if it exists
    if (robot.placed) {
      console.log("INSIDE THE IF");
      let currLocation = { x: robot.posX, y: robot.posY };
      let currRow = this.spaces.get(`${currLocation.y}`);
      console.log("1", { currRow });
      let currArr = currRow.get(`${currLocation.x}`);
      console.log("2", { currRow });
      currArr = currArr.filter((el) => el !== robot.name || Boolean(el));
      currRow.set(`${currLocation.x}`, currArr);
      console.log("3", { currRow });
    }

    // set robot
    let row = this.spaces.get(`${y}`);
    let robotArr = row.get(`${x}`);

    robotArr.push(robot.name);
    robotArr = robotArr.filter(Boolean);
    row.set(`${x}`, robotArr);

    // add to existing Set.
    this.robots.add(robot);
  }

  checkValidMove(x, y) {
    if (x > 4 || x < 0) {
      console.log("not a valid move - IGNORED");
      return false;
    }
    if (y > 4 || y < 0) {
      console.log("not a valid move - IGNORED");
      return false;
    }
    return true;
  }
};
