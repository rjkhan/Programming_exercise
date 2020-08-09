
const DEFINE_MOVMENTS = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 3,
    WEST: 4
};
class TrackingObjectController {

    /**
    * Creates a new MovingObject.
    * @class
    */

    constructor() {
        this._direction = 1;
    }

    set location(location){
        this._location = location;

    }

    get location(){
        return this._location;
    }

    set direction(direction){
        this._direction = direction;
    }

    get direction(){
        return this._direction;

    }

 
}

module.exports = TrackingObjectController