import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { UserService } from 'src/app/share/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showPopupUpload = false;
  visiblePopover: boolean = false;
  currentCategoryID = 0;
  showDetail = false;
  searchKey = '';
  searchEnable = false;

  currentDocument = new ParamDoc();

  isAdmin: any;

  timeSearch: any;

  currentUser: any;

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

  @ViewChild("ValueSearch", { static: false }) valueSearch: ElementRef;

  constructor(
    private router: Router,
    private transferDataSV: DataTransferService,
    private userSV: UserService
  ) { }

  ngOnInit(): void {
    this.transferDataSV.categoryID.subscribe(data => {
      if (data) {
        this.currentCategoryID = data;
      }
      else {
        this.currentCategoryID = null;
      }
    });

    setTimeout(() => {
      this.getUser();
    }, 200);

    this.transferDataSV.docTranData.subscribe(data => {
      if (data) {
        this.currentDocument = data;
        this.showPopupUpload = true;
      }
    });
  }

  getUser() {
    // setTimeout(() => {
    this.currentUser = this.userSV.getUserInfor();
    if (this.currentUser?.Role) {
      this.isAdmin = this.currentUser.Role;
    }
    else {
      this.isAdmin = 0;
    }
    // }, 200);
  }

  showRegister() {
    this.router.navigate([`account/register`]);
  }

  hiddenPopover() {
    this.visiblePopover = false;
  }

  showUserManegement() {
    this.visiblePopover = false;
    this.router.navigate([`user`], { queryParams: { id: this.currentUser.UserID } });
  }

  showHelpManegement() {
    this.visiblePopover = false;
    this.router.navigate([`help`]);
  }
  showReportManegement() {
    this.visiblePopover = false;
    this.router.navigate([`report`]);
  }
  backToHome() {
    this.currentCategoryID = null;
    this.router.navigate([`document`]);
  }

  togglePopover(e) {
    this.visiblePopover = true;
  }

  showUpload() {
    this.showPopupUpload = true;
  }

  closePopup(e) {
    this.showPopupUpload = false;
  }

  search(e) {
    if (e && e.event && e.event.keyCode === 13) {
      this.searchKey = this.valueSearch.nativeElement.value;
    }
    else {
      clearTimeout(this.timeSearch);
      this.timeSearch = setTimeout(() => {
        let inputSearch = this.valueSearch.nativeElement.value;
        if (inputSearch && inputSearch.trim() !== "") {
          inputSearch = inputSearch.trim();
        }

        this.searchKey = inputSearch;

      }, 200);
    }
  }

  selectCategory(data) {
    if (data) {
      this.currentCategoryID = data;
      // const queryParam = {
      //   CategoryID: data
      // }
      // this.router.navigate([], {
      //   relativeTo: this.activedRouter,
      //   queryParams: queryParam,
      //   queryParamsHandling: 'merge'
      // });
      this.router.navigate([`/document/categoryId/`, data]);
    }
  }

  openSearchEnable() {
    this.searchEnable = true;
  }

  hiddenSearch() {
    this.searchEnable = false;
  }

  hiddenPopupSearch(e) {
    this.searchEnable = e;
    this.searchKey = "";
  }

  logout() {
    localStorage.clear();
    window.location.href = "http://toedu.me/";
  }
}
