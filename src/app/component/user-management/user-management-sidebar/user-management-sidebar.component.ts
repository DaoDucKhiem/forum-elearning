import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-management-sidebar',
  templateUrl: './user-management-sidebar.component.html',
  styleUrls: ['./user-management-sidebar.component.scss']
})
export class UserManagementSidebarComponent implements OnInit {

  @Output() tab = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  switchTab(value) {
    this.tab.emit(value);
  }

}
