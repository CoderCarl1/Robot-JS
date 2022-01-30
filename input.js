const prompt = require("prompt");
const colors = require("colors/safe");
const Robot = require("./robot");
const BOARD = require("./board");

prompt.delimiter = colors.green("-> ");

function startPrompt() {
  prompt.get(
    {
      description: colors.magenta(`

      Do you want to start a new game?
      ---------------------------
      |  YES => Start a new game |
      |  NO / Exit => End game   |
      ---------------------------

      `),
      type: "string",
      message: "Please type one of the options, followed by the ENTER key",
      pattern: /yes|no|exit/i,
      required: true,
      before: function (value) {
        return value.trim().toUpperCase();
      },
    },
    (err, result) => {
      
      if (result.question.includes("YES")) {
        return firstInputPrompt();
      }
      if (result.question.includes("NO") || result.question.includes("EXIT")) {
        console.log(colors.red(`ENDING GAME.. 
        POWERING.. 
        DOWWWWWN...`));
        prompt.stop();
        return;
      }
      return startPrompt();
    }
  );
}

function firstInputPrompt() {
  prompt.get(
    {
      description: colors.magenta(`

      Place your first Robot
      -----------------------------------------------
    | 1: X,Y,Direction                               |
    | valid x & y input is a single digit number     |
    | valid direcions are: NORTH , SOUTH, EAST, WEST |
    | SEPERATE ALL VALUES WITH A COMMA               |
    |                                                |
    | 2. EXIT                                        |
    -------------------------------------------------

    `),
      type: "string",
      message: "Please enter, followed by the ENTER key",
      pattern: /\d,\d,\w+|exit/ig,
      required: true,
      before: function (value) {
        return value.trim().toUpperCase();
      },
    },
    (err, result) => {
      const { question } = result;
      if (question.includes("EXIT")){

        console.log(colors.red(`ENDING GAME.. 
        POWERING.. 
        DOWWWWWN...`));
        prompt.stop();
        return;
      }
      processInput("PLACE " + question);

      return InputPrompt()
      
    }
  );
}

function InputPrompt() {
  prompt.get(
    {
      description: colors.magenta(`

      ENTER YOUR MOVE
    --------------------------------
    | valid moves include:          |
    | 1: PLACE <X,Y,Direction>      |
    | 2: MOVE                       |
    | 3: LEFT or RIGHT              |
    |  - this will rotate the robot |
    |                               |
    | 4: REPORT                     |
    | 5: LIST                       |
    | - This lists all ROBOTS       |
    | 6: ROBOT <number>             |
    | - This sets the active Robot  |
    | 7. EXIT                       |
    --------------------------------

    `),
      type: "string",
      message: "Please type one of the options, followed by the ENTER key",
      pattern: /place|move|report|robot|left|right|exit/i,
      required: true,
      before: function (value) {
        return value.trim().toUpperCase();
      },
    },
    (err, result) => {
      
      const { question } = result;
      if (question.includes("EXIT")){

        console.log(colors.red(`ENDING GAME.. 
        POWERING.. 
        DOWWWWWN...`));
        prompt.stop();
        return;
      }
      processInput(question);

      return InputPrompt()
      
    }
  );
}

const ROBOTS = {}
let ACTIVE_ROBOT;

function processInput(input){

  switch (true) {
    case input.includes("PLACE"):
      const placement = input.split(" ")[1].split(",");
      const [x, y, direction] = placement;
      const ROBOT = new Robot(BOARD)
      ROBOTS[ROBOT.name] = ROBOT
      ACTIVE_ROBOT = ROBOT
      ACTIVE_ROBOT.placeRobot(Number(x), Number(y), direction);
      console.log(colors.cyan('Your ROBOT was placed at:'), colors.yellow(input));

      break;
    case input.includes("MOVE"):
      ACTIVE_ROBOT.moveRobot()

      console.log(colors.cyan("moved forward one space"));
      break;
    case input.includes("REPORT"):
      ACTIVE_ROBOT.getCurrentPos()
      break;
    case input.includes("LEFT"):
      ACTIVE_ROBOT.rotate(-1)
      console.log(colors.cyan('ROBOT turned 90 degrees anti-clockwise'));
      console.log(colors.yellow('ROBOT now facing', ACTIVE_ROBOT.direction));
      break;
    case input.includes("RIGHT"):
      ACTIVE_ROBOT.rotate(1)
      console.log(colors.cyan('ROBOT turned 90 degrees clockwise'));
      break;
    case input.includes('LIST'):

      break;
    case input.includes("ROBOT"):
      BOARD.activeRobot = input;
      ACTIVE_ROBOT = ROBOTS[ROBOT.name];
      console.log(colors.cyan('NOW CONTROLLING :', ACTIVE_ROBOT));
      break;
   
  }
}

module.exports = { startPrompt, InputPrompt, processInput, ACTIVE_ROBOT, ROBOTS };
