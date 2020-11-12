import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showPopupUpload = false;
  defaultVisible: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
  showHelpManegement(){
    this.router.navigate([`help`]);
  }
  backToHome() {
    this.router.navigate([`document`]);
  }
  togglePopover(e){
    this.defaultVisible = !this.defaultVisible
    e.stopPropagation()
  }
}
