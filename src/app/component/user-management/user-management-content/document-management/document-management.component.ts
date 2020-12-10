import { Component, OnInit } from '@angular/core';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DocumentService } from 'src/app/share/service/document.service';
import { Customer, Service } from './app.service';

declare var $: any;

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss'],
  providers: [Service]
})
export class DocumentManagementComponent implements OnInit {

  editVisible: boolean = false;
  deleteVisible: boolean = false;
  listDocument: ParamDoc[] = [];
  currentDocumentID: number;
  curentDocument: ParamDoc;
  isCategoryError: boolean;
  isDocumentNameError = false;
  isDescriptionError = false;
  listCategory = [];
  currentParam: ParamDoc = new ParamDoc();
  description = "";
  
  constructor(private documentSV: DocumentService) {
  }

  ngOnInit(): void {
    this.listCategory = [
      {
        ID: 1,
        Name: "Giáo trình"
      },
      {
        ID: 2,
        Name: "Đề Thi"
      },
      {
        ID: 3,
        Name: "Tài liệu"
      },
      {
        ID: 4,
        Name: "Phương pháp"
      },
    ]
    this.getDocumentByUserID();
  }
  getDocumentByUserID() {
    this.documentSV.getDocumentByUserId("64a59a25-2488-54b0-f6b4-c8af08a50cbf").subscribe((res) => {
      if (res?.Success) {
        this.listDocument = res.Data;
      }
    })
  }

  click(e) {
    this.deleteVisible = false;
    this.editVisible = false;
    if (e == 2) {
      this.documentSV.deleteByID(this.currentDocumentID).subscribe((res) => {
        if (res?.Success) {
          this.getDocumentByUserID();
        }
      })
    } if (e == 3) {
      this.documentSV.updateDocument(this.curentDocument).subscribe((res) => {
        if (res?.Success) {
          this.getDocumentByUserID();
        }
      })
    }
  }
  deleteDocument(e) {
    this.deleteVisible = true;
    this.currentDocumentID = e.data.DocumentID;
  }
  editDocument(e){
    this.curentDocument = e.data;
    this.editVisible = true;
  }

  validateDescription(e) {
    if (e) {
      if (e.value && e.value.trim() != '') {
        this.isDescriptionError = false;
      }
      else {
        this.isDescriptionError = true;
      }
    }

    this.curentDocument.Description = e.value;
  }
  setCategory(e) {
    if (e) {
      this.curentDocument.CategoryID = e.value;
      this.isCategoryError = false;
      $(".document-name").find("input").focus();
    }
  }

  setDocumentName(e) {
    if (e) {
      this.curentDocument.DocumentName = e.value;
      if (this.curentDocument.DocumentName && this.currentParam.DocumentName.trim() !== '') {
        this.isDocumentNameError = false;
      }
    }
  }

  onEnterTextBox(e) {
    if (e && e.event && e.event.keyCode === 13) {
      $("dx-text-area").find("textarea").focus();
    }
  }
  
}
