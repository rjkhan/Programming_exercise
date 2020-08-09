

class MatrixController{

    /**
    * Creates Matrix controller class.
    * @class
    */

    // constructor 
    constructor(){}

    // set matrix row and columns
    set size(size){
        this._size = size;

    }
    // get matrix row and columns
    get size(){
        return this._size;
    }
    
    set matrix(matrix){
        this._matrix = matrix;
    }

    get matrix(){
        return this._matrix;
    }

    // check object location in matrix, if it is inside the matrix or outside
    checkObjectPosition(location){
       
        if (location[0] < 0 || location[0] > (this._size[0] - 1)) {
            return true;
        } else if (location[1] < 0 || location[1] > (this._size[1] - 1)) {
            return true;
        }
    
        return false;
    }

}

module.exports = MatrixController;