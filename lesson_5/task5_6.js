'use strict';

const boardSize = 8;
const colorsChess = ['white', 'black'];

//Типы фигур и коды юникод для белых фигур, для черных +6.
const typesFigures = {
    'king': 9812,
    'queen': 9813,
    'rook': 9814,
    'knight': 9815,
    'bishop': 9816,
    'pawn': 9817, 
};

function getLetterByX(x) {
    return String.fromCharCode('a'.charCodeAt(0) + x - 1);
}

function getXByLetter(letter) {
    let x = letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    if (x < 1 || x > boardSize) {
        throw 'Incorrect letter "'+letter+'"';
    }
    return x;
}


class ChessBoard {

    constructor(parentEl) {
        this.boardEl = document.createElement('div');
        this.boardEl.classList.add('chess-board');
        this.figures = {}; // 'e1': Figure;
        parentEl.appendChild(this.boardEl);
        
        for (let y = 0; y <= boardSize; y++) {
            for (let x = 0; x <= boardSize; x++) {
                let ceilEl = this.addCeil(x, y);
                this.boardEl.appendChild(ceilEl);             
            }
        }
    }

    addFigure(figure) {
        this.figures[figure.position] = figure;
    }

    clearBoard() {
        let ceils = document.getElementsByClassName('chess__ceil');
        for (ceil of ceils) {
             ceil.innerHTML = '';
             ceil.classList.remove('chess-board__figure');
        }
        this.figures = {};
    }

    addCeil(x, y) {
        let newCeil = document.createElement('div');
        newCeil.classList.add('chess-board__ceil');
        let letter = getLetterByX(x); 
        if (x > 0 && y > 0) {
            //Для x и y больших нуля - рисуем клетки
            newCeil.classList.add('chess-board__ceil_' + ((x + y) % 2 == 0 ? 'black': 'white'));
            newCeil.id = letter + y; 
            
            if (y == boardSize) {
                newCeil.classList.add('chess-board__border-bottom');    
            }

            if (x == boardSize) {
                newCeil.classList.add('chess-board__border-right');    
            }

        } 
        //Для x или y равных нулю - выводим цифры или буквы
        else if (y == 0 && x > 0) {
            newCeil.innerText = letter;
            newCeil.classList.add('chess-board__border-bottom');
        }
        else if (x == 0 && y > 0) {
            newCeil.innerText = y;
            newCeil.classList.add('chess-board__border-right');
        }

        return newCeil;   
    }

}

class ChessFigure {
    
    constructor(board, position, typeFigure, color) {
        this.board = board;
        this.position = position.toLowerCase();
        this.typeFigure = typeFigure.toLowerCase();
        this.color = color.toLowerCase();

        let ceil = document.getElementById(position);
        if (ceil == undefined) {
            throw 'Error position of new figure ' + typeFigure;
        }

        let ofsCode = 0; //Коды unicode для белых и черных фируг отлчиваются на 6. Сначала идут белые, потом черные. 
        switch (this.color) {
            case 'white':
                break;
            case 'black':
                ofsCode = 6;
                break;
            default:
                throw 'Error color of new figure ' + typeFigure;
        }
        ceil.innerHTML = '&#'+(typesFigures[typeFigure] + ofsCode)+';';
        ceil.classList.add('chess-board__figure');
        let x = getXByLetter(position);
        board.addFigure(this);
    }    

}


class ChessGame {
    constructor(containerEl) {
        this.board = new ChessBoard(containerEl);    
    }

    startGame() {
        this.board.clearBoard();

        let pos, color;
        for (color of colorsChess) {
            pos = (color == 'white' ? '1' : '8');
            new ChessFigure(this.board, 'e' + pos, 'king', color);
            new ChessFigure(this.board, 'd' + pos, 'queen', color);
            new ChessFigure(this.board, 'c' + pos, 'knight', color);
            new ChessFigure(this.board, 'f' + pos, 'knight', color);        
            new ChessFigure(this.board, 'b' + pos, 'bishop', color);
            new ChessFigure(this.board, 'g' + pos, 'bishop', color);
            new ChessFigure(this.board, 'a' + pos, 'rook', color);
            new ChessFigure(this.board, 'h' + pos, 'rook', color);
        
            pos = (color == 'white' ? '2' : '7');
            for (let i = 1; i <= boardSize; i++) {
                new ChessFigure(this.board, getLetterByX(i)+pos, 'pawn', color);
            }
        }
    }

}


const containerEl = document.querySelector('div.container');
let game = new ChessGame(containerEl);
game.startGame();