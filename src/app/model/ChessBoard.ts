import ChessGame from "./ChessGame";
import ChessMan from "./ChessMan";
import { ChessBoardSize } from "./config/ChessBoardConfig";
import { ChessCellType } from "./config/ChessCellType";
import { ChessManPosition } from "./config/ChessManPosition";
import { ChessManTeam } from "./config/ChessManTeam";
import { ChessManType } from "./config/ChessManType";

class ChessBoard {

    chessMan!: ChessMan[]
    chessGame!: ChessGame

    constructor() {
        this.initBoard();
    }

    getInstance() {
        return this.chessMan.map(chessMan => chessMan.getInstance());
    }

    setInstance(instance: any[]) {
        this.chessMan = [];
        instance.forEach(chessMan => {
            const { type, position, team } = chessMan;
            this.chessMan.push(new ChessMan(type, position, team));
        });
    }

    initBoard(): void {
        this.chessMan = [];

        ChessMan.prototype.chessBoard = this;

        // Dark Team

        this.chessMan.push(new ChessMan(ChessManType.King, { row: 7, col: 4 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Queen, { row: 7, col: 3 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Bishop, { row: 7, col: 2 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Bishop, { row: 7, col: 5 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Horse, { row: 7, col: 1 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Horse, { row: 7, col: 6 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Car, { row: 7, col: 0 }, ChessManTeam.Dark));
        this.chessMan.push(new ChessMan(ChessManType.Car, { row: 7, col: 7 }, ChessManTeam.Dark));

        for (let col = 0; col < ChessBoardSize.width; col++) {
            this.chessMan.push(new ChessMan(ChessManType.Bot, { row: 6, col }, ChessManTeam.Dark));
        }

        //White Team

        this.chessMan.push(new ChessMan(ChessManType.King, { row: 0, col: 3 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Queen, { row: 0, col: 4 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Bishop, { row: 0, col: 2 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Bishop, { row: 0, col: 5 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Horse, { row: 0, col: 1 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Horse, { row: 0, col: 6 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Car, { row: 0, col: 0 }, ChessManTeam.White));
        this.chessMan.push(new ChessMan(ChessManType.Car, { row: 0, col: 7 }, ChessManTeam.White));

        for (let col = 0; col < ChessBoardSize.width; col++) {
            this.chessMan.push(new ChessMan(ChessManType.Bot, { row: 1, col }, ChessManTeam.White));
        }
    }

    getChessMan(position: ChessManPosition): ChessMan | undefined {
        for (let i = 0; i < this.chessMan.length; i++) {
            const { row, col } = this.chessMan[i].getPosition();
            if (row === position.row && col === position.col) {
                return this.chessMan[i];
            }
        }
        return undefined;
    }

    removeChessMan(position: ChessManPosition): void {
        for (let i = 0; i < this.chessMan.length; i++) {
            const { row, col } = this.chessMan[i].getPosition();
            if (row === position.row && col === position.col) {
                const rmv = this.chessMan.splice(i, 1)[0];
                this.chessGame.deadChessMan.push({
                    type: rmv.getType(),
                    team: rmv.getTeam()
                });
            }
        }
        return undefined;
    }

    getPath(chessMan: ChessMan): any[] {
        const path = [];
        for (let i = 0; i < this.chessMan.length; i++) {
            if (this.chessMan[i] === chessMan) {
                const selectedChessMan = chessMan;
                for (let j = 0; j < ChessBoardSize.height; j++) {
                    for (let k = 0; k < ChessBoardSize.width; k++) {
                        if (selectedChessMan.canMove({ row: j, col: k })) {
                            const chessMan = this.getChessMan({ row: j, col: k });
                            const type = chessMan ? (
                                chessMan.getType() === ChessManType.King ?
                                    ChessCellType.King :
                                    ChessCellType.Enemy
                            ) : ChessCellType.Empty;
                            path.push({
                                index: j * ChessBoardSize.width + k,
                                type
                            });
                        }
                    }
                }
                return path;
            }
        }
        return [];
    }
}

export default ChessBoard;