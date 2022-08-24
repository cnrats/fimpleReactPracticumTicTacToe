class Player {
    #symbol;
    #wins;
    constructor(symbol) {
        if(typeof symbol == "string" && symbol.length == 1){
            this.#symbol = symbol;
            this.#wins = 0;
        } else {
            throw "Symbol must be a 1 charecter string!"
        }
    }

    get symbol(){
        return this.#symbol;
    }

    get wins(){
        return this.#wins;
    }

    win(){
        this.#wins += 1;
    }
}

export{Player};