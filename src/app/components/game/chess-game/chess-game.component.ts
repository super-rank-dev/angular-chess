import { Component, ViewChild } from '@angular/core';
import ChessGame from 'src/app/model/ChessGame';
import ChessMan from 'src/app/model/ChessMan';
import { ChessManTeam } from 'src/app/model/config/ChessManTeam';
import { EventType } from 'src/app/config/event-type';
import { SharedService } from 'src/app/shared.service';
import { ChessBoardComponent } from '../chess-board/chess-board.component';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent {

  @ViewChild(ChessBoardComponent) chessBoardComponent!: ChessBoardComponent

  chessGame!: ChessGame
  darkDeadMen!: ChessMan[]
  whiteDeadMen!: ChessMan[]

  constructor(private sharedService: SharedService) {
    this.chessGame = new ChessGame();
    this.darkDeadMen = [];
    this.whiteDeadMen = [];

    this.sharedService.data.subscribe(data => {
      switch (data) {
        case EventType.Undo:
          this.chessGame.undoStack();
          break;
        case EventType.Redo:
          this.chessGame.redoStack();
          break;
        case EventType.Restart:
          this.chessGame.restartGame();
          break;
        case EventType.History:
          break;
        default:
          break;
      }
      this.updateGame();
      this.chessBoardComponent.updateBoard();
    });
  }

  updateGame() {
    this.darkDeadMen =
      this
        .chessGame
        .deadChessMan
        .filter(deadMan => deadMan.team === ChessManTeam.Dark);
    this.whiteDeadMen =
      this
        .chessGame
        .deadChessMan
        .filter(deadMan => deadMan.team === ChessManTeam.White);
  }
}
