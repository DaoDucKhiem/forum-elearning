import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/share/model/document';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents: Doc[] = [];
  showPopupUpload = false;


  constructor(
    private documentService: DocumentService,
    private dataTransferSV: DataTransferService
  ) { }

  ngOnInit(): void {
    for (var i = 0; i < 5; i++) {
      let doc: Doc = new Doc();
      doc.documentName = "Tên tài liệu"
      doc.documentType = "pdf"
      doc.posterName = "Hải Dương"
      doc.point = 1
      doc.viewCount = 2
      doc.downloadCount = 1999;
      this.documents.push(doc)
    }
    // this.getDocument();

    // this.dataTransferSV.postSuccess.subscribe(data => {
    //   this.getDocument();
    // });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  getDocument() {
    this.documentService.getAll().subscribe(res => {
      if (res && res.data) {
        this.documents = res.data;
      }
    });
  }

  showUpload() {
    this.showPopupUpload = true;
  }

  closePopup(e) {
    this.showPopupUpload = false;
  }
}
