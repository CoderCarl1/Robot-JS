const prompt = require("prompt");

function startPrompt() {
  prompt.get(
    {
      description: `Do you want to start a new game?
      ---------------------------
      |  YES => Start a new game |
      |  NO / Exit => End game   |
      ---------------------------
      `,
      type: "string",
      message: "Please type one of the options, followed by the ENTER key",
      pattern: /yes|no|exit/i,
      required: true,
      before: function (value) {
        return value.trim().toUpperCase();
      },
    },
    (err, result) => {
      console.log({ err });
      if (result.question.includes("YES")) {
        return InputPrompt();
      }
      if (result.question.includes("NO") || result.question.includes("EXIT")) {
        console.log(`ENDING GAME.. 
        POWERING.. 
        DOWWWWWN...`);
        return null;
      }
      return startPrompt();
    }
  );
}

function InputPrompt() {
  prompt.get(
    {
      description: `ENTER YOUR MOVE
    ---------------------------
    | valid moves include:     |
    | 1: PLACE <X,Y,Direction> |
    | 2: MOVE                  |
    | 3: REPORT                |
    | 4: ROBOT <number>        |
    ---------------------------
    `,
      type: "string",
      message: "Please type one of the options, followed by the ENTER key",
      pattern: /place |move|report|robot/i,
      required: true,
      before: function (value) {
        return value.trim().toUpperCase();
      },
    },
    (err, result) => {
      console.log({ result });
      const { question } = result;
      switch (true) {
        case question.includes("PLACE"):
          const placement = result.question.split(" ")[1].split(",");

          console.log("robot placed at", { placement });
          break;
        case question.includes("MOVE"):
          console.log("moved forward one space");
          break;
        case question.includes("REPORT"):
          // code block
          console.log("reporting");
          break;
        case question.includes("ROBOT"):
          console.log("not added just yet, ma bad");
          break;
        default:
          console.log("default");
        // code block
      }

      return "wooo";
    }
  );
}

module.exports = { startPrompt, InputPrompt };
