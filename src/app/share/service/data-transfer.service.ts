import { EventEmitter, Injectable, Output } from '@angular/core';
import { ParamDoc } from '../model/param/param-doc';

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

  // emit categoryID
  @Output() categoryID = new EventEmitter<number>();
  transferCategoryID(id) {
    this.categoryID.emit(id);
  }

  // emit documnet để update
  @Output() docTranData = new EventEmitter<ParamDoc>();
  transferDocument(data: ParamDoc) {
    this.docTranData.emit(data);
  }

  // emit documnet để update
  @Output() updateDoc = new EventEmitter<boolean>();
  transferResultUpdate() {
    this.updateDoc.emit(true);
  }
}