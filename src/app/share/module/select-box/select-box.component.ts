import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  @Input() title: string;
  @Input() required: boolean;

  _dataSource = [];
  @Input() set dataSource(data: any) {
    if (data) {
      this._dataSource = data;
    }
  }
  @Input() placeholder: string;
  @Input() displayExpr: string;
  @Input() valueExpr: string;
  @Input() value: string;

  @Input() isError = false;
  @Input() textError: string;

  @Output() onValueChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  valueChange(e) {
    if (e) {
      this.onValueChanged.emit(e);
    }
  }

}
