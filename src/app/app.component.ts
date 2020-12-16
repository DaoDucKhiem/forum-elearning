
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from './share/service/authen.service';
import { UserService } from './share/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sid: string;
  routingFromMainApp = false;
  constructor(private userSV: UserService, private authenSV: AuthenService, private router: Router) { }
  ngOnInit() {
   // this.initApp();
   this.getUserLogin();
  }

  /**
   * lấy thông tin user sau khi đăng nhập
   * ddkhiem
   */
  getUserLogin() {
    this.userSV.getCurrentUser().subscribe(data => {
      if (data && data.Success && data.Data) {
        if (data.Data.UserData) {
          localStorage.setItem('UserData', JSON.stringify(data.Data.UserData));
          if (this.routingFromMainApp) {
            this.router.navigate([""]);
          }
        }
      }
      else {
        this.router.navigate(["/not-found"]);
      }
    })
  }

  /**
     * Hàm kiểm tra có phải được redirect từ Main App hay không
     * true: đúng, false: sai
     * Created by nvkhai 29.11.2020
     */
  isRedirectedFromMainaApp() {
    var url = window.location;
    this.sid = new URLSearchParams(url.search).get("sid");
    if (
      url.pathname === "/redirect" &&
      this.sid !== null &&
      this.sid !== ""
    ) {
      return true;
    }
    return false;
  }

  initApp() {
    this.routingFromMainApp = this.isRedirectedFromMainaApp();
    if (this.routingFromMainApp) {
      window.localStorage.clear();

      this.authenSV.getToken(this.sid).subscribe(res => {
        if (res.code == 401) {
          // sid không hợp lệ
          window.location.href = "http://toedu.me/";
        } else if (res.code == 200) {
          // Lấy token Thành công
          // Lưu token vào local storage
          window.localStorage.setItem("x-token", res.data.token);
          // Tiếp tục những tác vụ khác của app
          this.getUserLogin();
        } else {
          // Lỗi khác
          window.location.href = "http://toedu.me/";
        }
      })
    }
    else {
      var token = window.localStorage.getItem("x-token");
      if (token && token.trim() !== "") {
        this.authenSV.checkToken(token).subscribe(res => {
          if (res.code == 200) {
            // // Tiếp tục những tác vụ khác của app
            this.getUserLogin();
          } else {
            // Lỗi khác
            window.location.href = "http://toedu.me/";
          }
        })
      }
      else {
        // Trường hợp không có token, redirect qua main app
        window.location.href = "http://toedu.me/";
      }
    }
  }
}
