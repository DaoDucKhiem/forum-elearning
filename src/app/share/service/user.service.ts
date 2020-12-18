import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';
import { ServerResponse } from '../model/server-response';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<object> {

  constructor(
    public http: HttpService
  ) {
    super(http, "users");
  }

  /**
   * lấy thông tin user khi đăng nhập
   * call api tách thông tin từ token
   * gen thêm token để call lên stringee
   */
  getCurrentUser():Observable<ServerResponse> {
    return this.http.get(`${this.getApiURL()}/GetUserLogin`);
  }

  // lấy thông tin user lưu trong localstorage
  getUserInfor() {
    var userData = localStorage.getItem("UserData");
    if (userData) {
      return JSON.parse(userData);
    }
    else return null;
  }

  // lấy thông tin user từ id
  getDataUserInfor(id: string):Observable<ServerResponse> {
    return this.http.get(`${this.getApiURL()}?id=${id}`);
  }

  // cập nhật điểm của người dùng tại localstorage
  updatePointLocal(userInfo) {
    localStorage.setItem('UserData', JSON.stringify(userInfo));
  }

  // cập nhật điểm khi tải tài liệu
  updatePoint(param):Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/updatePoint`, param);
  }
}
