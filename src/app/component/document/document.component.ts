import { Component, OnInit } from '@angular/core';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';

class GeneralInfor {
  Total: number;
  TotalView: number;
  TotalDownload: number;
}

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents: ParamDoc[] = [];

  listRecentDoc: ParamDoc[] = []; // danh sách tài liệu gần đây và phổ biến

  //Danh sách theo gần nhất
  listRecentDocument: ParamDoc[] = [];
  //Danh sách theo xem nhiều nhất
  listMostDocument: ParamDoc[] = [];

  infor = new GeneralInfor();

  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.getDocumentInfoGeneral();
  }

  /**
   * lấy thông tin chung
   */
  getDocumentInfoGeneral() {
    // lấy thông tin số tài liệu, lượt xem, lượt tải
    this.documentService.getInfor().subscribe(res => {
      if (res && res.Success && res.Data) {
        this.infor = res.Data;
      }
    });

    const param = {
      SearchKey: "",
      CategoryID: 20,
      PageSize: 10,
      PageIndex: 0
    }

    // lấy danh sách tài liệu gần nhất
    this.documentService.getMostPopularDocument(param).subscribe(data => {
      if (data && data.Success && data.Data) {
        this.listRecentDocument = data.Data;
      }
    });

    param.CategoryID = 10;
    // lấy danh sách tài liệu phổ biến nhất
    this.documentService.getMostPopularDocument(param).subscribe(data => {
      if (data && data.Success && data.Data) {
        this.listMostDocument = data.Data;
      }
    });

  }
}
