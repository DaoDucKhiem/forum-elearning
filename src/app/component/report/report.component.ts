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

  currentReportID: number;

  toolAction = false;

  showPopupDelete = false;

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
        else {
          this.listDocument = [];
          this.listComment = [];
          this.listDone = [];
        }
      }
      else {

      }
    })
  }

  changeStatus(e) {
    this.toolAction = true;
    this.reportSV.changeStatusReport(e).subscribe((res) => {
      if (res?.Success) {
        this.getAllReport();
        this.toolAction = false;
      }
    })
  }
  goToDocument(docID) {
    if (!this.toolAction) {
      this.transferDataSV.transferCategoryID(0);
      this.router.navigate([`/${docID}`]);
    }
  }

  DeleteReport() {
    this.reportSV.DeleteReport(this.currentReportID).subscribe((res) => {
      if (res?.Success) {
        this.getAllReport();
        this.toolAction = false;
      }
      this.closePopupDelete();
    })
  }

  chooseTab(id) {
    this.switchReport = id;
  }

  showPopup(e) {
    this.toolAction = true;
    this.currentReportID = e;
    this.showPopupDelete = true;
  }

  closePopupDelete() {
    this.showPopupDelete = false;
  }
}
