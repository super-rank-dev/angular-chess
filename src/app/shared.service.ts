import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  data:EventEmitter<any> = new EventEmitter();

  constructor() { }

  updateData(data: any) {
    this.data.emit(data);
  }
}
