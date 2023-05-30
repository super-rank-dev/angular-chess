import { Action } from "@ngrx/store";
import ChessBoard from "src/app/model/ChessBoard";

export enum GameActionType {
    SetChessBoard = '[GAME ACTION] Set Chess Board'
}

export class SetChessBoard implements Action {
    readonly type = GameActionType.SetChessBoard;
    constructor(public payload: ChessBoard) { }
}