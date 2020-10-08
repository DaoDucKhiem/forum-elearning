import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-upload',
  templateUrl: './popup-upload.component.html',
  styleUrls: ['./popup-upload.component.scss']
})
export class PopupUploadComponent implements OnInit {

  @Input() popupVisible = false;
  @Output() hiddenPopup = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.hiddenPopup.emit(true);
  }

}
