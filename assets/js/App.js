import {Setting} from "./Setting.js";
import {Player} from "./Player.js";
import {Game} from "./Game.js";

class App{
    //Declare consts.
    #element
    #game
    #setting
    #playerX
    #playerY

    //Setup game.
    constructor(container, columns, rows, playerOneName, playerTwoName, playerOneSymbol, playerTwoSymbol){
        if(typeof container == "string"){
            this.#element = document.getElementById(container);
        } else {
            throw "Container parameter must be a string!";
        }

        this.#setting = new Setting(columns, rows, playerOneName, playerTwoName);
        this.#playerX = new Player(playerOneSymbol);
        this.#playerY = new Player(playerTwoSymbol);
        this.#game = new Game(this.#setting);
        this.#game.addPlayer(this.#playerX);
        this.#game.addPlayer(this.#playerY);
        this.#game.makeSquares();
        this.#game.drawSquares();
        this.#element.appendChild(this.#game.elementGame);
        this.#element.appendChild(this.#game.elementInfo);
        this.#element.appendChild(this.#game.elementModal);
    }
}

//Make app object.
const app = new App("container", 3, 3, "Player One", "Player Two", "X", "O");