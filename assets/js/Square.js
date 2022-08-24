class Square {
    #player;
    #element;
    #elementContainer;

    constructor(element){
        if(element.nodeType == 1){
            this.#element = element;
            const elementContainer = document.createElement("div");
            this.#element.appendChild(elementContainer);
            this.#elementContainer = elementContainer;
        } else {
            throw "Element nodeType must be a 1!"
        }
    }

    get isEmpty(){
        if(!this.#player){
            return true;
        } else {
            return false;
        }
    }

    get element(){
        return this.#element;
    }

    get symbol(){
        if(typeof this.#player !== 'undefined'){
            return this.#player.symbol;
        }
        return false;
    }

    get player(){
        return this.#player;
    }

    claimEmpty(){
        this.#elementContainer.innerHTML = "-";
        this.#player = undefined;
    }

    claim(player){
        if(this.isEmpty){
            this.#elementContainer.innerHTML = player.symbol;
            this.#player = player
            return true
        }
        return false
    }

    addClassContainer(cssClass){
        this.#element.classList.add(cssClass)
    }

    addClassSymbol(cssClass){
        this.#elementContainer.classList.add(cssClass)
    }
}

export{Square}