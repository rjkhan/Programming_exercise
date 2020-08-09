// Include required files
let MatrixController = require("./controllers/matrixController");
let InputController = require("./controllers/inputController");
let TrackingObjectController = require("./controllers/trackingObjectController");
let {USERDEFINED_COMMANDS,MESSAGES,PROGRAM_STATES} = require('./helper')

// initialization of objects
let inputController = new InputController(); //Input controller object  initialization
let matrixController = new MatrixController(); //matrix controller object initialization 
let objectTrackingController = new TrackingObjectController();  //objectTracking controller object initialization 

// size contains number of rows and number of columns
matrixController.size = new Int16Array(2);

// location with respect to X,y coridinates
objectTrackingController.location = new Int16Array(2);


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
