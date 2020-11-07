import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  //emit su kien dang tai lieu thanh cong
  @Output() postSuccess = new EventEmitter<boolean>();
  postDocumentSuccess() {
    this.postSuccess.emit(true);
  }
}