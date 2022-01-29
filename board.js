class Board {
  constructor() {
    this.spaces = this.createBlankBoard();
    this.robots = new Set();
    // this.activeRobot = "Robot 1";
  }

  createBlankBoard() {
    let spaces = {}
   
    for (let i = 0; i < 5; i++) {
      spaces[`${i}`] = Array(5).fill([])
    }

    return spaces;
  }

  displaySpaces() {
    console.log(this.spaces)
  }

  placeRobot(x, y, robot) {
    if (x == undefined || y == undefined || robot == undefined) return false;
    if (!this.checkValidMove(x, y)) return false;
    if (robot.placed) {
      this.removeRobot(robot)
    }

    let row = this.spaces[`${y}`];
    let robotArr = [...row[x]];
    
    robotArr.push(robot.name);
    row[x] = robotArr.filter(Boolean);
    

    this.spaces[`${y}`] = row
    
    this.robots.add(robot);

  }

  removeRobot(robot){
    let row = this.spaces[`${robot.posY}`];
    let robotArr = [...row[robot.posX]];

    robotArr = robotArr.filter((el) => el !== robot.name);
    row[robot.posX] = robotArr;

    this.spaces[`${robot.posY}`] = row;
 
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

const BOARD = new Board;

module.exports = BOARD;