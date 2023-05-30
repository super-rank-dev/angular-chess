import { Component, Input } from '@angular/core';
import ChessMan from 'src/app/model/ChessMan';

@Component({
  selector: 'app-chess-cell',
  templateUrl: './chess-cell.component.html',
  styleUrls: ['./chess-cell.component.css']
})
export class ChessCellComponent {
  @Input() chessMan!: ChessMan | undefined;
  @Input() bgColor!: string;
  @Input() status!: string;
}
