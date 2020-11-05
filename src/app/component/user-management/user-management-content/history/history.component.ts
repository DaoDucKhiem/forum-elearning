import { Component, OnInit } from '@angular/core';
import { Customer, Service } from '../document-management/app.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [Service]
})
export class HistoryComponent implements OnInit {


  customers: Customer[];

  constructor(service: Service) { 
    this.customers =  service.getCustomers();
  }

  ngOnInit(): void {
  }

}
