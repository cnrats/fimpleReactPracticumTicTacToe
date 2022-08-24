class Setting{
    #rows;
    #columns;
    #playerOneName;
    #playerTwoName;

    constructor(rows, columns, playerOneName, playerTwoName){
        if(rows <= 100 && rows >= 0 && columns <= 100 && columns >= 0){
            this.#rows = rows;
            this.#columns = columns;
        } else {
            throw "Rows and columns must be a bigger than 0 and smaller than 100!"
        }

        if(typeof playerOneName == "string" && typeof playerTwoName == "string"){
            this.#playerOneName = playerOneName;
            this.#playerTwoName = playerTwoName;
        }
    }

    get columns(){
        return this.#columns;
    }

    get rows(){
        return this.#rows;
    }

    get total(){
        return this.#rows * this.#columns;
    }

    get playerOneName(){
        return this.#playerOneName;
    }

    get playerTwoName(){
        return this.#playerTwoName;
    }

}

export {Setting};