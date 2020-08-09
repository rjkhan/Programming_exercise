
// Include required files
let MatrixController = require("./controllers/matrixController");
let InputController = require("./controllers/inputController");
let TrackingObjectController = require("./controllers/trackingObjectController");

// initialization of objects
let inputController = new InputController(); //Input controller object  initialization
let matrixController = new MatrixController(); //matrix controller object initialization 
let objectTrackingController = new TrackingObjectController();  //objectTracking controller object initialization 

// size contains number of rows and number of columns
matrixController.size = new Int16Array(2);

// location with respect to X,y coridinates
objectTrackingController.location = new Int16Array(2);

// Pogram states
const PROGRAM_STATES = 
{
    SAVE_SIZE_AND_POSITION: 1,
    RUN_PROGRAM: 2,
    RESTART: 3
};
//program menu and error messages
const MESSAGES = 
{
    CONTINUE: 'Press any key and enter to continue.',
    TYPE_SIZE_POSITION: 'Type the size of the matrix and the position of the object: width,height,x,y',
    COMMANDS_MENU: 'Type simulation commands, use comma to separate the commands eg \'1,3,1,1,0\':\n' +
      '0 = quit simulation and print results to stout\n' + '1 = move forward one step\n' +
      '2 = move backwards one step\n' + '3 = rotate clockwise 90 degrees (eg north to east)\n' +
      '4 = rotate counterclockwise 90 degrees (eg west to south)',
    ERROR: 'Incorrect character or incorrect amount of characters, please try again'
};

const USERDEFINED_COMMANDS = {
    QUIT: 0,
    FORWARD: 1,
    BACKWARD: 2,
    ROTATE: 3,
    COUNTERROTATE: 4
};

inputController.maxCommandValue = 4;
console.log(MESSAGES.TYPE_SIZE_POSITION);
let programState = PROGRAM_STATES.SAVE_SIZE_AND_POSITION;

process.stdin.on('data', function (inputUTF8Codes) {

    let userInput;
    if (programState !== PROGRAM_STATES.RESTART) {      
      userInput = inputController.convertUserInput(inputUTF8Codes);
    }
  
    switch (programState) {
      case PROGRAM_STATES.SAVE_SIZE_AND_POSITION:
        if (inputController.checkUserInputPosition(userInput)) {
            storeSizePosition(userInput);
            programState = PROGRAM_STATES.RUN_PROGRAM;
            console.log(MESSAGES.COMMANDS_MENU);
        } else {
            console.log(MESSAGES.ERROR);
        }
        break;
      case PROGRAM_STATES.RUN_PROGRAM:
        if (inputController.checkInputRunSimulation(userInput)) {
            // Starts simulation and prints the output
            console.log('Output: [' + runSimulation(userInput) + ']');
            programState = PROGRAM_STATES.RESTART;
            console.log(MESSAGES.CONTINUE);
        } else {
            console.log(MESSAGES.ERROR);
        }
        break;
      case PROGRAM_STATES.RESTART:
        programState = PROGRAM_STATES.SAVE_SIZE_AND_POSITION;
        objectTrackingController.direction = 1;
        console.log(MESSAGES.TYPE_SIZE_POSITION);
        break;
      default:
    }
  });
    
    function storeSizePosition(userInput) {
        let userInputArray = new Int16Array(1);
        let arrayBuffer = new ArrayBuffer(16);
        let slotsPerInt = 2;
        let parsedUserInput = new DataView(arrayBuffer);
        let currentValue = 0;
        let exponent = 0;
  
        for (let i = 0; i < userInput.length; i++) {
    
            if (userInput[i] !== -1) {
                userInputArray[0] += (userInput[i] * Math.pow(10, exponent));
                exponent++;
            } else {
                parsedUserInput.setInt16(currentValue, userInputArray[0], true);
                userInputArray[0] = 0;
                currentValue += slotsPerInt;
                exponent = 0;
            }
  
  
        }
  
        objectTrackingController.location[0] = parsedUserInput.getInt16(2, true);
        objectTrackingController.location[1] = parsedUserInput.getInt16(0, true);
        matrixController.size[0] = parsedUserInput.getInt16(6, true);
        matrixController.size[1] = parsedUserInput.getInt16(4, true);
    }
  

    function runSimulation(inputCommands) {
  
        for (let i = (inputCommands.length - 1); i >= 0; i--) {
    
            if (inputCommands[i] === -1) { 
            } else if (inputCommands[i] === USERDEFINED_COMMANDS.FORWARD || inputCommands[i] === USERDEFINED_COMMANDS.BACKWARD) {
                objectTrackingController.objectMovement(inputCommands[i], USERDEFINED_COMMANDS);
                if (matrixController.checkObjectPosition(objectTrackingController.location)) {
                    objectTrackingController.location[0] = -1;
                    objectTrackingController.location[1] = -1;
                    return objectTrackingController.location;
                }
            } else if (inputCommands[i] === USERDEFINED_COMMANDS.ROTATE || inputCommands[i] === USERDEFINED_COMMANDS.COUNTERROTATE) {
                objectTrackingController.objectRotation(inputCommands[i], USERDEFINED_COMMANDS);
            } else if (inputCommands[i] === USERDEFINED_COMMANDS.QUIT) {
                return objectTrackingController.location;
            }
        }
  
        return objectTrackingController.location;
    }
