import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { UserService } from 'src/app/share/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showPopupUpload = false;
  defaultVisible: boolean = false;
  currentCategoryID = 0;
  showDetail = false;
  searchKey = '';
  searchEnable = false;

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

    this.getUser();
  }

  getUser() {
    this.currentUser = this.userSV.getUserInfor();
  }

  showLogin() {
    this.router.navigate([`account/login`]);
  }

  showRegister() {
    this.router.navigate([`account/register`]);
  }
  showUserManegement() {
    this.router.navigate([`user`]);
  }
  showHelpManegement() {
    this.router.navigate([`help`]);
  }
  backToHome() {
    this.currentCategoryID = null;
    this.router.navigate([`document`]);
  }
  togglePopover(e) {
    this.defaultVisible = !this.defaultVisible
    e.stopPropagation()
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
}
