import ChessBoard from "src/app/model/ChessBoard";
import { GameActionType } from "../action";

const initialState = {
    chessBoard: ChessBoard
};

export const gameReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case GameActionType.SetChessBoard:
            return {
                ...state,
                chessBoard: action.payload
            }
        default:
            break;
    }
}