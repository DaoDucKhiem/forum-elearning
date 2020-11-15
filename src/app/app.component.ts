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
      if (data && data.Success && data.Data) {
        if (data.Data.UserData.StringeeToken) {
          localStorage.setItem("StringeeToken", data.Data.UserData.StringeeToken);
        }
        if (data.Data.UserData.Token) {
          localStorage.setItem("Token", data.Data.UserData.Token);
        }
      }
    })
  }
}
