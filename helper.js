
/// Pogram states
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

module.exports = {USERDEFINED_COMMANDS,MESSAGES,PROGRAM_STATES};