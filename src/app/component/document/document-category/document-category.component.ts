import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentCategory: any;
  hostBook: ParamDoc;

  searchKey = "";

  @ViewChild("ValueSearch", { static: false }) valueSearch: ElementRef;

  timeSearch: any;

  listCategory = [
    {
      ID: 1,
      Name: "Giáo trình",
      Icon: "../../../assets/icon/teach.png"
    },
    {
      ID: 2,
      Name: "Đề Thi",
      Icon: "../../../assets/icon/examinate.png"
    },
    {
      ID: 3,
      Name: "Tài liệu",
      Icon: "../../../assets/icon/document.png"
    },
    {
      ID: 4,
      Name: "Phương pháp",
      Icon: "../../../assets/icon/personal.svg"
    },
  ]

  constructor(
    private activedRouter: ActivatedRoute,
    private transferDataSV: DataTransferService,
    private documentService: DocumentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activedRouter.params.subscribe(data => {
      if (data) {
        const ID = parseInt(data['id']);
        this.currentCategory = this.listCategory.filter(x => x.ID === ID)[0];
        this.transferDataSV.transferCategoryID(ID);
        this.searchKey = "";
        this.getDocument();
      }
    });

    this.subscribeUploadDoc();
  }

  // bắt sự thay đổi khi upload doc
  subscribeUploadDoc() {
    this.transferDataSV.postSuccess.subscribe(data => {
      if (data) {
        this.getDocument();
      }
    });
  }

  getDocument() {
    let param = {
      SearchKey: this.searchKey,
      CategoryID: this.currentCategory.ID,
      PageSize: 5,
      PageIndex: 0
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        this.documents = res.Data;
        this.hostBook = res.Data[0];
      }
    })
  }

  openDetail(doc) {
    this.transferDataSV.transferCategoryID(0);
    this.router.navigate([`/${doc.DocumentID}`]);
  }

  search(e) {
    if (e && e.event && e.event.keyCode === 13) {
      this.searchKey = this.valueSearch.nativeElement.value;
      this.getDocument();
    }
    else {
      clearTimeout(this.timeSearch);
      this.timeSearch = setTimeout(() => {
        let inputSearch = this.valueSearch.nativeElement.value;
        if (inputSearch && inputSearch.trim() !== "") {
          inputSearch = inputSearch.trim();
        }

        this.searchKey = inputSearch;
        this.getDocument();

      }, 200);
    }
  }

  backHome() {
    this.router.navigate([""]);
  }

}
