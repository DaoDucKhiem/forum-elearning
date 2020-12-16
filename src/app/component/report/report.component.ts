import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { ReportService } from 'src/app/share/service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  switchReport: boolean = true;
  listReport: any[];

  constructor(
    private reportSV: ReportService,
    private router: Router, 
    private transferDataSV: DataTransferService
  ) { }

  ngOnInit(): void {
    this.getAllReport();
  }

  getAllReport() {
    this.reportSV.getAllReport().subscribe((res) => {
      if (res?.Success) {
        this.listReport = res.Data;
      }
    })
  }

  changeStatus(e) {
    this.reportSV.changeStatusReport(e).subscribe((res) => {
      if (res?.Success) {
        this.getAllReport();
      }
    })
  }
  goToDocument(docID){
    this.transferDataSV.transferCategoryID(0);
    this.router.navigate([`/${docID}`]);
  }
  DeleteReport(e) {

  }
}
