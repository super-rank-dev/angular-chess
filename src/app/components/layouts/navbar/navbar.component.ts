import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { EventType } from 'src/app/config/event-type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private sharedService: SharedService) { }

  onClickUndo() {
    this.sharedService.updateData(EventType.Undo);
  }

  onClickRedo() {
    this.sharedService.updateData(EventType.Redo);
  }

  onClickRestart() {
    this.sharedService.updateData(EventType.Restart);
  }

  onClickHistory() {
    this.sharedService.updateData(EventType.History);
  }

}
