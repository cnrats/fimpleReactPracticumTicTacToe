class Info{
    #element;

    constructor(){
        this.#element = document.createElement("div");
        this.#element.setAttribute("id", "info");
    }

    get element(){
        return this.#element;
    }

    log(message){
        if (typeof message == "string"){
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("message");
            messageContainer.innerHTML = message;
            this.#element.appendChild(messageContainer);
            this.#element.scrollTop = this.#element.scrollHeight;
        }
    }
}

export {Info};