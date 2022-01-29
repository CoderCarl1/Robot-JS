const prompt = require("prompt");
const fs = require('fs');
const BOARD = require("./board");
const Robot = require("./robot");
const { startPrompt, InputPrompt, processInput } = require("./input");

const input = fs
                .readFileSync('input.txt', {encoding: 'utf-8'})
                .split("\n")
                .filter(Boolean)

input.forEach(command => processInput(command))
