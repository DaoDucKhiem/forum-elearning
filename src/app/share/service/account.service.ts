import { Injectable } from '@angular/core';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<object> {

  constructor(
    public http: HttpService
  ) {
    super(http, "account");
  }

  // xử lý sign in sign out ở đây
}
