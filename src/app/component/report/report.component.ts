import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/share/model/param/report';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { ReportService } from 'src/app/share/service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  switchReport = 1;
  listDocument: Report[] = [];
  listComment: Report[] = [];
  listDone: Report[] = [];


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
      if (res?.Success && res?.Data) {
        if (res.Data.length > 0) {
          this.listDocument = res.Data.filter(x => x.Status == 0 && x.ReportType == 1);
          this.listComment = res.Data.filter(x => x.Status == 0 && x.ReportType == 2);
          this.listDone = res.Data.filter(x => x.Status == 1);
        }
      }
      else {

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
  goToDocument(docID) {
    this.transferDataSV.transferCategoryID(0);
    this.router.navigate([`/${docID}`]);
  }
  DeleteReport(e) {

  }

  chooseTab(id) {
    this.switchReport = id;
  }
}
