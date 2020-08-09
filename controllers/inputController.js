class InputController{

    /**
    * Creates InputController class.
    * @class
    */

    // constructor 
    constructor(){
        this._maxCommandValue = 1;
    }

    // setter function to set command value
    set maxCommandValue(maxCommandValue){
        this._maxCommandValue = maxCommandValue;
    }

    get maxCommandValue(){
        return this._maxCommandValue;
    }

    // convert user Input to number or digit
    convertUserInput(userInput) {
        let theBuffer = (Buffer.from(userInput));
        let inputCommandCounter = 1;
        let inputArray = new Uint8Array(theBuffer); // store the userInput in array
        let outputArray = new Int8Array(theBuffer); // store the output to be return

        let outputIndex = (outputArray.length - 2);
        outputArray[(outputArray.length - 1)] = -1;
    
        // convert user input into digits or number
        for (let i = 0; i < inputArray.length; i++) {

          if ((inputArray[i] !== 44)) {
            outputArray[outputIndex] = inputArray[i] - 48;
    
          } else {
            outputArray[outputIndex] = -1;
            inputCommandCounter = inputCommandCounter + 1;
          }
    
          outputIndex--;
        }

        return outputArray;
      }
    
    // check the input position number
    checkUserInputPosition(userInput) {
        
        let amaountOfNumbers = 0;
        let firstNoneZero = false; // flag for first NoneZero Elements
        let secondNoneZero = false; // second nonZero Elements
    
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] > 9){
              return false;
          }
          if (userInput[i] < (-1)) {
              return false;
          }
          if (amaountOfNumbers === 3 && (userInput[i] > 0)) {
              firstNoneZero = true;
          }
    
          if (amaountOfNumbers === 2 && (userInput[i] > 0)) {
              secondNoneZero = true;
          }
    
          if (userInput[i] === -1) {
              amaountOfNumbers++;
              if (amaountOfNumbers > 4)
              return false;
          }
        }
        if (amaountOfNumbers < 4) {
            return false;
        }
        return !(firstNoneZero === false || secondNoneZero === false);
    }
    
    
    checkInputRunSimulation(userInput) {
        
        if (userInput.length < 2) {
          return false;
        }

        let sum = 0;
        let exp = 0;
        
        for (let i = 0; i < userInput.length; i++) {
            
            if (userInput[i] < (-1)){
                return false;
            }
            if (userInput[i] === -1) {
                sum = 0;
                exp = 0;
            } else {
                sum += (userInput[i] * Math.pow(10, exp));
                exp++;
            }
            if (sum > this._maxCommandValue) {
                return false;
            }
        }
    
        return true;
    }
}

module.exports = InputController;