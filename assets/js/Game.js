import {Setting} from "./Setting.js"
import {Player} from "./Player.js"
import {Square} from "./Square.js"
import {Info} from "./Info.js"
import {Modal} from "./Modal.js"

class Game{
    #players = [];
    #squares = [];
    #setting;
    #info;
    #modal;
    #element;
    #turn;
    #counter = 0;

    constructor(setting){
        if(setting instanceof Setting){
            this.#setting = setting;
        } else {
            throw "Setting must be a Setting object!"
        }

        this.#element = document.createElement("div");
        this.#element.setAttribute("id", "game");

        this.#info = new Info();
        this.#modal = new Modal();

        this.#modal.setModal("Tic Tac Toe Game", "Welcome to tic tac toe game!", "Start");
        this.#modal.toggleModal();
    }

    get elementGame(){
        return this.#element;
    }

    get elementInfo(){
        return this.#info.element;
    }

    get elementModal(){
        return this.#modal.element;
    }

    addPlayer(player){
        if(player instanceof Player){
            if(this.#players.length == 0){
                this.#turn = player;
                this.#info.log("Player " + this.#turn.symbol + "'s turn.");
            }

            if(this.#players.length <= 2){
                this.#players.push(player)
            } else {
                throw "Maximum 2 players!"
            }
        } else {
            throw "Player must be a player object!"
        }
    }

    changeTurn(){
        if(this.#players.length >= 2){
            if(this.#turn == this.#players[0]){
                this.#turn = this.#players[1];
            } else {
                this.#turn = this.#players[0];
            }
            this.#info.log("Player " + this.#turn.symbol + "'s turn.");
        } else {
            throw "There are not enough players to switch turn!"
        }
    }

    logScores(){
        this.#info.log("Player " + this.#players[0].symbol + " has " + this.#players[0].wins + " scores.");
        this.#info.log("Player " + this.#players[1].symbol + " has " + this.#players[1].wins + " scores.");
    }

    squareClick(square){
        let index;

        this.#squares.forEach((arraySquare, i) => {
            if(square == arraySquare){
                index = i;
            }
        });

        if(square.claim(this.#turn)){
            this.#info.log("Player " + this.#turn.symbol + " made move " + (index + 1) + "'th square!");
            this.changeTurn();
            this.#counter +=1;
        }
        
        if(!this.intersectionCheck(square) && this.#counter == this.#setting.total){
            this.logScores();
            this.#info.log("Tie!");
            this.#modal.setModal("Tie!", "No one wins the game!", "Restart");
            this.#modal.toggleModal();
            this.reset();
        }
    }
    
    makeSquares(){
        for(let i = 0; i < this.#setting.total; i++){
            const squareElement = document.createElement("div");
            squareElement.addEventListener("click", () => {this.squareClick(square);});
            const square = new Square(squareElement);
            square.claimEmpty();
            square.addClassContainer("square");
            square.addClassSymbol("symbol");
            this.#squares.push(square)
        }
    }

    drawSquares(){
        this.#squares.forEach(square => {
            this.#element.appendChild(square.element);
        });
    }

    reset(){
        this.#squares.forEach(square => {
            square.claimEmpty();
        });

        this.#counter = 0;
    }

    win(winner){
        let index;

        this.#players.forEach((player, i) => {
            if(player == winner){
                index = i;
            }
        });

        this.#players[index].win();

        this.logScores();
        this.#info.log("Player " + winner.symbol + " wins the game!");
        
        this.#modal.setModal("We have a winner!", "Player '" + winner.symbol + "' wins the game!", "Restart");
        this.#modal.toggleModal();

        this.reset();
    }

    intersectionCheck(square){
        //Find index of square.
        let index;

        this.#squares.forEach((arraySquare, i) => {
            if(square == arraySquare){
                index = i;
            }
        });

        //Find the number of elements around.
        const topRemaining = parseInt(index / this.#setting.rows);
        const rightRemaining = this.#setting.columns - (index % this.#setting.rows)-1;
        const bottomRemaining = this.#setting.rows - parseInt(index / this.#setting.rows) - 1;
        const leftRemaining = index % this.#setting.rows;
        const topRightCrossRemaining = (topRemaining > rightRemaining) ? rightRemaining : topRemaining;
        const bottomRightCrossRemaining = (bottomRemaining > rightRemaining) ? rightRemaining : bottomRemaining;
        const bottomLeftCrossRemaining = (bottomRemaining > leftRemaining) ? leftRemaining : bottomRemaining;
        const topLeftCrossRemaining = (topRemaining > leftRemaining) ? leftRemaining : topRemaining;

        let i, count = 0;

        //Look up.
        if(topRemaining >= 2){
            for(i = 1; i <= topRemaining; i++){
                if(this.#squares[index - i * this.#setting.columns].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look right.
        if(rightRemaining >= 2){
            count = 0;
            for(i = 1; i <= rightRemaining; i++){
                if(this.#squares[index + i].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look bottom.
        if(bottomRemaining >= 2){
            count = 0;
            for(i = 1; i <= bottomRemaining; i++){
                if(this.#squares[index + i * this.#setting.columns].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look left.
        if(leftRemaining >= 2){
            count = 0;
            for(i = 1; i <= leftRemaining; i++){
                if(this.#squares[index - i].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look top right cross
        if(topRightCrossRemaining >= 2){
            count = 0;
            for(i = 1; i <= topRightCrossRemaining; i++){
                if(this.#squares[(index - this.#setting.columns * i) + i].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look bottom right cross
        if(bottomRightCrossRemaining >= 2){
            count = 0;
            for(i = 1; i <= bottomRightCrossRemaining; i++){
                if(this.#squares[(index + this.#setting.columns * i) + i].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look bottom left cross
        if(bottomLeftCrossRemaining >= 2){
            count = 0;
            for(i = 1; i <= bottomLeftCrossRemaining; i++){
                if(this.#squares[(index + this.#setting.columns * i) - i].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Look top left cross
        if(topLeftCrossRemaining >= 2){
            count = 0;
            for(i = 1; i <= topLeftCrossRemaining; i++){
                if(this.#squares[(index - this.#setting.columns * i) - i].symbol == this.#squares[index].symbol){
                    count += 1;
                }
                if(count == 2){
                    this.win(this.#squares[index].player);
                    return true;
                }
            }
        }

        //Inner right cross
        if(topRightCrossRemaining >= 1 && bottomLeftCrossRemaining >= 1){
            if(this.#squares[index].symbol == this.#squares[index - this.#setting.columns + 1].symbol && this.#squares[index].symbol == this.#squares[index + this.#setting.columns - 1].symbol){
                this.win(this.#squares[index].player);
                return true;
            }
        }

        //Inner left cross
        if(topLeftCrossRemaining >= 1 && bottomRightCrossRemaining >= 1){
            if(this.#squares[index].symbol == this.#squares[index - this.#setting.columns - 1].symbol && this.#squares[index].symbol == this.#squares[index + this.#setting.columns + 1].symbol){
                this.win(this.#squares[index].player);
                return true;
            }
        }
        
        return false;
    }
}

export {Game};