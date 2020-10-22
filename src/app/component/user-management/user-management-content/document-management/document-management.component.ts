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

  constructor(service: Service) {
      this.customers =  service.getCustomers();
  }

  ngOnInit(): void {
  }

}
