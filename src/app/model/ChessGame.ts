import ChessBoard from "./ChessBoard"
import { ChessManTeam } from "./config/ChessManTeam";

class ChessGame {

    chessBoard!: ChessBoard

    chessBoardStack!: any[]
    stackIndex!: number

    deadChessMan!: any[]
    deadStack!: any[]
    deadIndex!: number

    turn!: ChessManTeam;

    constructor() {

        ChessBoard.prototype.chessGame = this;
        this.chessBoard = new ChessBoard();

        this.chessBoardStack = [this.chessBoard.getInstance()];
        this.stackIndex = 0;

        this.deadChessMan = [];
        this.deadStack = [[...this.deadChessMan]];
        this.deadIndex = 0;

        this.turn = ChessManTeam.Dark;
    }

    toggleTurn(): void {
        this.turn = (this.turn === ChessManTeam.Dark) ?
            ChessManTeam.White :
            ChessManTeam.Dark;
    }

    pushStack(chessBoard: ChessBoard): void {

        this.chessBoardStack.splice(this.stackIndex + 1);
        this.chessBoardStack.push(chessBoard.getInstance());
        this.stackIndex++;

        this.deadStack.splice(this.deadIndex + 1);
        this.deadStack.push(JSON.parse(JSON.stringify(this.deadChessMan)));
        this.deadIndex++;
    }

    undoStack(): void {

        this.stackIndex--;
        if (this.stackIndex < 0)
            this.stackIndex++;
        this.chessBoard.setInstance(this.chessBoardStack[this.stackIndex]);

        this.deadIndex--;
        if (this.deadIndex < 0)
            this.deadIndex++;
        this.deadChessMan = JSON.parse(JSON.stringify(this.deadStack[this.deadIndex]));

        this.toggleTurn();
    }

    redoStack(): void {

        this.stackIndex++;
        if (this.stackIndex >= this.chessBoardStack.length)
            this.stackIndex--;
        this.chessBoard.setInstance(this.chessBoardStack[this.stackIndex]);

        this.deadIndex++;
        if (this.deadIndex >= this.deadStack.length)
            this.deadIndex--;
        this.deadChessMan = JSON.parse(JSON.stringify(this.deadStack[this.deadIndex]));

        this.toggleTurn();
    }

    restartGame(): void {
        this.chessBoard.initBoard();

        this.chessBoardStack = [this.chessBoard.getInstance()];
        this.stackIndex = 0;

        this.deadChessMan = [];
        this.deadStack = [[...this.deadChessMan]];
        this.deadIndex = 0;

        this.turn = ChessManTeam.Dark;
    }
}

export default ChessGame;