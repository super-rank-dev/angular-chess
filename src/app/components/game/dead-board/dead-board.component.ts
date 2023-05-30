import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dead-board',
  templateUrl: './dead-board.component.html',
  styleUrls: ['./dead-board.component.css']
})
export class DeadBoardComponent {
  @Input() deadMen!: any[]
}
