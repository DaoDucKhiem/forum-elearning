import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  @Input() title: string;
  @Input() required: string;
  @Input() value: string;
  @Input() placeholder: string;

  @Input() isError: boolean;
  @Input() textError: string;

  @Output() onValueChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  valueChanged(e) {
    if (e) {
      this.onValueChanged.emit(e);
    }
  }

}
