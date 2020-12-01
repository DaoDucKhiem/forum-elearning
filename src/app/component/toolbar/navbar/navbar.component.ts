import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  @ViewChild("ValueSearch", {static: false}) valueSearch: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activedRouter.queryParams.subscribe(data => {
      if (data) {
        this.currentCategoryID = parseInt(data.CategoryID);
      }
    });
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
      
    }

    console.log(this.searchKey);
  }
  selectCategory(data) {
    if (data) {
      this.currentCategoryID = data;
      const queryParam = {
        CategoryID: data
      }
      this.router.navigate([], {
        relativeTo: this.activedRouter,
        queryParams: queryParam,
        queryParamsHandling: 'merge'
      });

    }
  }

  openSearchEnable() {
    this.searchEnable = true;
  }

  hiddenSearch() {
    this.searchEnable = false;
  }
}
