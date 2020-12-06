import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss']
})
export class DocInfoComponent implements OnInit {

  @Input() document: ParamDoc;

  constructor(private router: Router, private transferDataSV: DataTransferService) { }

  ngOnInit(): void {
  }

  showDetail() {
    this.transferDataSV.transferCategoryID(0);
    this.router.navigate([`/${this.document.DocumentID}`]);
  }

}
