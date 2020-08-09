let MatrixController = require("./controllers/matrixController");
let InputController = require("./controllers/inputController");


//Input controller object  initialization
let inputController = new InputController();
//matrix controller object initialization 
let matrixController = new MatrixController();


// size contains number of rows and number of columns
matrixController.dimension = new Int16Array(2);

const MESSAGES = {
    TYPE_SIZE_POSITION: 'Type the size of the matrix and the position of the object: width,height,x,y',
    COMMANDS_MENU: 'Type simulation commands, use comma to separate the commands eg \'1,3,1,1,0\':\n' +
      '0 = quit simulation and print results to stout\n' +
      '1 = move forward one step\n' +
      '2 = move backwards one step\n' +
      '3 = rotate clockwise 90 degrees (eg north to east)\n' +
      '4 = rotate counterclockwise 90 degrees (eg west to south)',
    PRESS_KEY: 'Press any key and enter to continue.',
    ERROR: 'Incorrect character or incorrect amount of characters, please try again'
};

const USERDEFINED_COMMANDS = {
    QUIT: 0,
    FORWARD: 1,
    BACKWARD: 2,
    ROTATE: 3,
    COUNTERROTATE: 4
};

// there are total four commmnad so max value is 4
inputController.maxCommandValue = 4;

console.log(MESSAGES.TYPE_SIZE_POSITION);
