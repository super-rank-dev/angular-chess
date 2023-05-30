import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventType } from 'src/app/config/event-type';
import { ToastrService } from 'ngx-toastr';

import ChessBoard from 'src/app/model/ChessBoard';
import ChessMan from 'src/app/model/ChessMan';
import { ChessBoardSize } from 'src/app/model/config/ChessBoardConfig';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  @Input() chessBoard!: ChessBoard;
  @Output() dataEvent = new EventEmitter();

  chessBoardSize!: any;
  chessCell!: any[];
  src!: ChessMan | undefined;

  constructor(private toastr: ToastrService) {
    toastr.toastrConfig.positionClass = 'toast-bottom-left';
  }

  ngOnInit(): void {
    this.updateBoard();
  }

  updateBoard(): void {
    const { width, height } = ChessBoardSize;

    this.chessCell = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.chessCell.push({
          chessMan: this.chessBoard.getChessMan({ row: i, col: j }),
          bgColor: (i + j) % 2 === 0 ? 'dark' : 'white'
        });
      }
    }
  }

  onClick(index: number): void {
    const { width } = ChessBoardSize;

    if (!this.src) {

      this.src = this.chessBoard.getChessMan({ row: Math.floor(index / width), col: index % width });

      if (this.src) {

        if (this.src.getTeam() !== this.chessBoard.chessGame.turn) {
          this.toastr.warning('Not your turn!', 'Warning!');
          this.src = undefined;
          return;
        }

        this.chessCell[index].bgColor = 'selected';

        const path = this.chessBoard.getPath(this.src);
        path.forEach(({ index, type }) => {
          this.chessCell[index].bgColor = type;
        });

      }
    }
    else {

      const { row, col } = this.src.getPosition();
      if (
        !this.src.setPosition({
          row: Math.floor(index / width),
          col: index % width
        })
      ) {
        this.toastr.warning('Cannot move!', 'Warning!');
      }
      this.chessCell[row * ChessBoardSize.width + col].bgColor =
        (row + col) % 2 === 0 ? 'dark' : 'white';

      this.updateBoard();
      this.dataEvent.emit(EventType.UpdateGame);
      this.src = undefined;

    }
  }
}
