const prompt = require("prompt");
const Board = require("./board");
const Robot = require("./robot");
const { startPrompt, InputPrompt } = require("./input");

const BOARD = new Board();
// console.log({ BOARD });

const ROBOT1 = new Robot(BOARD);
// const ROBOT2 = new Robot(BOARD);
// const ROBOT3 = new Robot(BOARD);
// console.log({ ROBOT1 });
ROBOT1.placeRobot("2", "0");
ROBOT1.placeRobot("4", "0");
// ROBOT1.placeRobot("2", "0");
// ROBOT2.placeRobot("2", "0");
// ROBOT3.placeRobot("2", "0");
// ROBOT1.moveSelect({ move: "PLACE", commands: "2,3,NORTH" });
// BOARD.displaySpaces();
// const ROBOT2 = new Robot(BOARD);
// console.log({ ROBOT2 });
// ROBOT2.placeRobot(3, 4);
// console.log(BOARD.spaces);
// console.log({ ROBOT1 });
// // Start prompt
// prompt.start();
// // Entry point
// startPrompt();
