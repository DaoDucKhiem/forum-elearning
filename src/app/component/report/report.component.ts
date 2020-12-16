import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  switchReport: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
}

  goToDocument(e){

  }
  DeleteReport(e){

  }
}
