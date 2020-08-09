class TrackingObjectController {

    /**
     * object tacking class
     * @class
    */
  
    constructor() {
      this._direction = 1;
    }
  
    set location(location) {
      this._location = location;
    }
  
    get location() {
      return this._location;
    }
  
    set direction(direction) {
      this._direction = direction;
    }
  
    get direction() {
      return this._direction;
    }
  
    objectRotation(inputCommand, userDefineCommand) {
        if (inputCommand === userDefineCommand.ROTATE) {
            this._direction++;
            if (this._direction > OBJECT_AXIS.WEST) {
                this._direction = OBJECT_AXIS.NORTH;
            }
        } else if (inputCommand === userDefineCommand.COUNTERROTATE) {
            this._direction--;
            if (this._direction < OBJECT_AXIS.NORTH) {
                this._direction = OBJECT_AXIS.WEST;
            }
        }
    };
  
    objectMovement(inputCommand, userDefineCommand) {
  
        if (this._direction === OBJECT_AXIS.NORTH || this._direction === OBJECT_AXIS.SOUTH) {
  
            if ((inputCommand === userDefineCommand.FORWARD && this._direction === OBJECT_AXIS.NORTH) || (inputCommand === userDefineCommand.BACKWARD && this._direction === OBJECT_AXIS.SOUTH)) {
                this._location[1]--;
            } else if ((inputCommand === userDefineCommand.FORWARD && this._direction === OBJECT_AXIS.SOUTH) || (inputCommand === userDefineCommand.BACKWARD && this._direction === OBJECT_AXIS.NORTH)) {
                this._location[1]++;
            }
    
        } else if (this._direction === OBJECT_AXIS.EAST || this._direction === OBJECT_AXIS.WEST) {
            if ((inputCommand === userDefineCommand.FORWARD && this._direction === OBJECT_AXIS.EAST) || (inputCommand === userDefineCommand.BACKWARD && this._direction === OBJECT_AXIS.WEST)) {
                this._location[0]++;
            } else if ((inputCommand === userDefineCommand.FORWARD && this._direction === OBJECT_AXIS.WEST) || (inputCommand === userDefineCommand.BACKWARD && this._direction === OBJECT_AXIS.EAST)) {
                this._location[0]--;
            }
        }
      return 1;
  
    }
  
  }
  
  const OBJECT_AXIS = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 3,
    WEST: 4
  };
  
  
  module.exports = TrackingObjectController;
  
  
  