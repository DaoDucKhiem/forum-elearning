import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showPopupUpload = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showUpload() {
    this.showPopupUpload = true;
  }

  closePopup(e) {
    this.showPopupUpload = false;
  }

  showLogin() {
    this.router.navigate([`account/login`]);
  }

  showRegister() {
    this.router.navigate([`account/register`]);
  }
  showUserManegement(){
    this.router.navigate([`user`]);
  }
  backToHome() {
    this.router.navigate([`document`]);
  }
}
