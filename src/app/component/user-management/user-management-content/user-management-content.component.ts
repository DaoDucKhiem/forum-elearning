import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management-content',
  templateUrl: './user-management-content.component.html',
  styleUrls: ['./user-management-content.component.scss']
})
export class UserManagementContentComponent implements OnInit {

  _tab: any;
  get tab(): any {
    return this._tab;
  }
  @Input() set tab(value: any) {
    !value && (this._tab = 1)
    value && (this._tab = value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
