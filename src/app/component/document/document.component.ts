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
  showPopupUpload = false;
  searchKey: string = "";
  searchDocument: boolean = false;
  //Danh sách theo tìm kiếm
  listSearchDocument: ParamDoc[] = [];
  //Danh sách theo gần nhất
  listRecentDocument: ParamDoc[] = [];
  //Danh sách theo xem nhiều nhất
  listMostDocument: ParamDoc[] = [];
  //Danh sách theo CateID = 1
  listCate1Document: ParamDoc[] = [];
  //Danh sách theo CateID = 2
  listCate2Document: ParamDoc[] = [];
  //Danh sách theo CateID = 3
  listCate3Document: ParamDoc[] = [];

  constructor(
    private documentService: DocumentService,
    private dataTransferSV: DataTransferService
  ) { }

  ngOnInit(): void {
    this.getDocument();
    this.getDocumentByCategoryID(1)
    this.getDocumentByCategoryID(2)
    this.getDocumentByCategoryID(3)
    this.dataTransferSV.postSuccess.subscribe(data => {
      this.getDocument();
      this.getDocumentByCategoryID(1)
      this.getDocumentByCategoryID(2)
      this.getDocumentByCategoryID(3)
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getDocumentByCategoryID(category = null) {
    let param = {
      SearchKey: "",
      CategoryID: category,
      PageSize: 5,
      PageIndex: 1
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        category == 1 && (this.listCate1Document = res.Data);
        category == 2 && (this.listCate2Document = res.Data);
        category == 3 && (this.listCate3Document = res.Data);
      }
    })
  }

  getDocument(category = null) {
    let param = {
      SearchKey: "",
      CategoryID: category,
      PageSize: 5,
      PageIndex: 1
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        this.listMostDocument = res.Data;
        this.listRecentDocument = res.Data;
      }
    })
  }

  showUpload() {
    this.showPopupUpload = true;
  }

  closePopup(e) {
    this.showPopupUpload = false;
  }

  onSearch() {
    this.scroll(document.getElementById('search'))
  }
  changeValue(e) {
    this.searchKey = e.target.value
    this.searchDocument = true;
    let param = {
      SearchKey: this.searchKey,
      CategoryID: null,
      PageSize: 20,
      PageIndex: 1
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        this.listSearchDocument = res.Data;
      }
    })
  }
}
