import { Component, OnInit } from '@angular/core';
import { Customer, Service } from './app.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss'],
  providers: [Service]
})
export class DocumentManagementComponent implements OnInit {

  customers: Customer[];
  editVisible: boolean = false;
  deleteVisible: boolean = false;

  constructor(service: Service) {
      this.customers =  service.getCustomers();
  }

  ngOnInit(): void {
  }

  click(e){

  }
}
