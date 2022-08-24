class Modal{
    #element
    #innerContainer
    #topContainer
    #middleContainer
    #bottomContainer
    #title
    #content
    #button

    constructor(){
        this.#element = document.createElement("div");
        this.#innerContainer = document.createElement("div");
        this.#topContainer = document.createElement("div");
        this.#middleContainer = document.createElement("div");
        this.#bottomContainer = document.createElement("div");
        this.#title = document.createElement("div");
        this.#content = document.createElement("div");
        this.#button = document.createElement("div");

        this.#element.setAttribute("id", "modal");
        this.#innerContainer.setAttribute("id", "modalInner");
        this.#topContainer.setAttribute("id", "modalTop");
        this.#middleContainer.setAttribute("id", "modalMiddle");
        this.#bottomContainer.setAttribute("id", "modalBottom");
        this.#title.setAttribute("id", "modalTitle");
        this.#content.setAttribute("id", "modalContent");
        this.#button.setAttribute("id", "modalButton");

        this.#element.appendChild(this.#innerContainer);

        this.#innerContainer.appendChild(this.#topContainer);
        this.#innerContainer.appendChild(this.#middleContainer);
        this.#innerContainer.appendChild(this.#bottomContainer);
        
        this.#topContainer.appendChild(this.#title);
        this.#middleContainer.appendChild(this.#content);
        this.#bottomContainer.appendChild(this.#button);

        this.#button.addEventListener("click", () => {
            this.toggleModal();
        })
    }

    get element(){
        return this.#element;
    }

    setModal(title, content, button){
        if(typeof title == "string" && typeof content == "string" && typeof button == "string"){
            this.#title.innerHTML = title;
            this.#content.innerHTML = content;
            this.#button.innerHTML = button;
        } else {
            throw "Modal attributes must be a string!";
        }
    }

    toggleModal(){
        this.#element.classList.toggle("showModal");
    }
}

export {Modal};