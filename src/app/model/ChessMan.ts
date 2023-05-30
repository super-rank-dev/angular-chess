import ChessBoard from "./ChessBoard";
import { ChessManPosition } from "./config/ChessManPosition";
import { ChessManTeam } from "./config/ChessManTeam";
import { ChessManType } from "./config/ChessManType";

class ChessMan {

    chessBoard!: ChessBoard;

    constructor(
        private type: ChessManType,
        private position: ChessManPosition,
        private team: ChessManTeam
    ) { }

    getInstance() {
        return {
            type: this.type,
            position: this.position,
            team: this.team
        };
    }

    getTeam(): ChessManTeam {
        return this.team;
    }

    getType(): ChessManType {
        return this.type;
    }

    setType(type: ChessManType): void {
        this.type = type;
    }

    getPosition(): ChessManPosition {
        return this.position;
    }

    setPosition(position: ChessManPosition): boolean {
        if (this.canMove(position)) {
            this.chessBoard.removeChessMan(position);
            this.position = position;
            this.chessBoard.chessGame.pushStack(this.chessBoard);
            this.chessBoard.chessGame.toggleTurn();
            return true;
        }
        return false;
    }

    canMove(position: ChessManPosition): boolean {

        const chessMan = this.chessBoard.getChessMan(position);
        if (chessMan && chessMan.getTeam() === this.team) {
            return false;
        }

        let possibility;
        switch (this.type) {
            case ChessManType.King:
                if (
                    Math.abs(position.row - this.position.row) <= 1 &&
                    Math.abs(position.col - this.position.col) <= 1
                ) return true;
                break;
            case ChessManType.Queen:
                possibility = false;
                if (position.row === this.position.row) {
                    possibility = true;
                    this.chessBoard.chessMan.forEach(item => {
                        const pos = item.getPosition();
                        if (pos.row === position.row &&
                            (pos.col - position.col) *
                            (pos.col - this.position.col) < 0)
                            possibility = false;
                    })
                }
                else if (position.col === this.position.col) {
                    possibility = true;
                    this.chessBoard.chessMan.forEach(item => {
                        const pos = item.getPosition();
                        if (pos.col === position.col &&
                            (pos.row - position.row) *
                            (pos.row - this.position.row) < 0)
                            possibility = false;
                    })
                }
                else if (Math.abs(position.row - this.position.row) ===
                    Math.abs(position.col - this.position.col)) {
                    possibility = true;
                    this.chessBoard.chessMan.forEach(item => {
                        const pos = item.getPosition();
                        if (Math.abs(pos.row - this.position.row) ===
                            Math.abs(pos.col - this.position.col) &&
                            (pos.row - this.position.row) *
                            (pos.row - position.row) < 0 &&
                            (pos.col - this.position.col) *
                            (pos.col - position.col) < 0)
                            possibility = false;
                    })
                }
                return possibility;
            case ChessManType.Bishop:
                possibility = false;
                if (Math.abs(position.row - this.position.row) ===
                    Math.abs(position.col - this.position.col)) {
                    possibility = true;
                    this.chessBoard.chessMan.forEach(item => {
                        const pos = item.getPosition();
                        if (Math.abs(pos.row - this.position.row) ===
                            Math.abs(pos.col - this.position.col) &&
                            (pos.row - this.position.row) *
                            (pos.row - position.row) < 0 &&
                            (pos.col - this.position.col) *
                            (pos.col - position.col) < 0)
                            possibility = false;
                    })
                }
                return possibility;
            case ChessManType.Horse:
                if (
                    (
                        Math.abs(position.row - this.position.row) === 2 &&
                        Math.abs(position.col - this.position.col) === 1
                    ) || (
                        Math.abs(position.row - this.position.row) === 1 &&
                        Math.abs(position.col - this.position.col) === 2
                    )
                ) return true;
                break;
            case ChessManType.Car:
                possibility = false;
                if (position.row === this.position.row) {
                    possibility = true;
                    this.chessBoard.chessMan.forEach(item => {
                        const pos = item.getPosition();
                        if (pos.row === position.row &&
                            (pos.col - position.col) *
                            (pos.col - this.position.col) < 0)
                            possibility = false;
                    })
                }
                else if (position.col === this.position.col) {
                    possibility = true;
                    this.chessBoard.chessMan.forEach(item => {
                        const pos = item.getPosition();
                        if (pos.col === position.col &&
                            (pos.row - position.row) *
                            (pos.row - this.position.row) < 0)
                            possibility = false;
                    })
                }
                return possibility;
            case ChessManType.Bot:
                possibility = false;
                const chessMan = this.chessBoard.getChessMan({ row: position.row, col: position.col });
                if (position.row === this.position.row &&
                    Math.abs(position.col - this.position.col) === 1) {
                    possibility = true;
                    if (chessMan)
                        possibility = false;
                }
                else if
                    (
                    this.team === ChessManTeam.Dark &&
                    position.row - this.position.row === -1
                ) {
                    if (position.col - this.position.col === 0 && !chessMan)
                        possibility = true;
                    if (Math.abs(position.col - this.position.col) === 1 && chessMan)
                        possibility = true;
                }
                else if (
                    this.team === ChessManTeam.White &&
                    position.row - this.position.row === 1
                ) {
                    if (position.col - this.position.col === 0 && !chessMan)
                        possibility = true;
                    if (Math.abs(position.col - this.position.col) === 1 && chessMan)
                        possibility = true;
                };
                return possibility;
            default:
                break;
        }

        return false;
    }
}

export default ChessMan;