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
}
