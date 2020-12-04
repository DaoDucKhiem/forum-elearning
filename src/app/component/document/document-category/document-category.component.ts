import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';

@Component({
  selector: 'app-document-category',
  templateUrl: './document-category.component.html',
  styleUrls: ['./document-category.component.scss']
})
export class DocumentCategoryComponent implements OnInit {

  documents: ParamDoc[] = [];
  currentCategoryID: number;

  constructor(
    private activedRouter: ActivatedRoute,
    private transferDataSV: DataTransferService,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.activedRouter.params.subscribe(data => {
      if (data) {
        this.currentCategoryID = parseInt(data['id']);
        this.transferDataSV.transferCategoryID(this.currentCategoryID);
        this.getDocument();
      }
    });
  }

  getDocument() {
    let param = {
      SearchKey: "",
      CategoryID: this.currentCategoryID,
      PageSize: 5,
      PageIndex: 0
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        this.documents = res.Data;
      }
    })
  }

}
