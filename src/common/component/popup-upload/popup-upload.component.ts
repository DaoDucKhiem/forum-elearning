import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-upload',
  templateUrl: './popup-upload.component.html',
  styleUrls: ['./popup-upload.component.scss']
})
export class PopupUploadComponent implements OnInit {

  @Input() popupVisible = false;
  @Output() hiddenPopup = new EventEmitter<boolean>();

  files: any = [];

  description = "";

  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.hiddenPopup.emit(true);
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
    console.log(this.files);
    
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

}
