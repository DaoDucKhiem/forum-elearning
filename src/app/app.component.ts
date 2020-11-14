import { Component, OnInit } from '@angular/core';
import { UserService } from './share/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userSV: UserService) { }
  ngOnInit() {
    this.userSV.getCurrentUser().subscribe(data => {
      if (data && data.success && data.data) {
        if (data.data.userData.stringeeToken) {
          localStorage.setItem("StringeeToken", data.data.userData.stringeeToken);
        }
        if (data.data.userData.token) {
          localStorage.setItem("Token", data.data.userData.token);
        }
      }
    })
  }
}
