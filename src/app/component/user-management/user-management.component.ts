import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';
import { UserService } from 'src/app/share/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  tab: any;
  currentUser: any;
  searchKey = '';

  documents: ParamDoc[] = [];

  currentDoc = new ParamDoc();
  showPopup = false;

  @ViewChild("ValueSearch", { static: false }) valueSearch: ElementRef;
  timeSearch: any;

  me: any;

  constructor(
    private activedRouter: ActivatedRoute,
    private userSV: UserService,
    private documentSV: DocumentService,
    private transferDataSV: DataTransferService
  ) { }

  ngOnInit(): void {
    this.activedRouter.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getUserInfo(id);
        this.getListDocByUserID(id);
      }
    });

    this.me = this.userSV.getUserInfor();
    this.subscribeUploadDoc();
  }

  subscribeUploadDoc() {
    this.transferDataSV.postSuccess.subscribe(data => {
      if (data) {
        this.getListDocByUserID(this.currentUser.UserID);
      }
    });
  }

  getUserInfo(id: string) {
    this.userSV.getDataUserInfor(id).subscribe(res => {
      if (res && res.Success) {
        this.currentUser = res.Data;
      }
    });
  }

  getListDocByUserID(id: string) {
    this.documentSV.getDocumentByUserId(id).subscribe(res => {
      if (res && res.Success) {
        this.documents = res.Data;
      }
    });
  }

  search(e) {
    if (e && e.event && e.event.keyCode === 13) {
      this.searchKey = this.valueSearch.nativeElement.value;
      // search here
    }
    else {
      clearTimeout(this.timeSearch);
      this.timeSearch = setTimeout(() => {
        let inputSearch = this.valueSearch.nativeElement.value;
        if (inputSearch && inputSearch.trim() !== "") {
          inputSearch = inputSearch.trim();
        }

        this.searchKey = inputSearch;
        // search here

      }, 200);
    }
  }

  showPopupConfirmDelete(item) {
    this.currentDoc = item;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.currentDoc = null;
  }

  // xóa tài liệu
  deleteDoc() {
    this.documentSV.deleteByID(this.currentDoc.DocumentID).subscribe(res => {
      if (res && res.Success) {
        this.closePopup();
        this.getListDocByUserID(this.currentUser.UserID);
      }
    });
  }

}
