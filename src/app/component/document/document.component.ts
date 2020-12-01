import { Component, OnInit } from '@angular/core';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents: ParamDoc[] = [];

  //Danh sách theo gần nhất
  listRecentDocument: ParamDoc[] = [];
  //Danh sách theo xem nhiều nhất
  listMostDocument: ParamDoc[] = [];

  constructor(
    private documentService: DocumentService,
    private dataTransferSV: DataTransferService
  ) { }

  ngOnInit(): void {
    this.getDocument();
  }

  getDocument(category = null) {
    let param = {
      SearchKey: "",
      PageSize: 5,
      PageIndex: 0
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        this.listMostDocument = res.Data;
        this.listRecentDocument = res.Data;
      }
    })
  }
}
