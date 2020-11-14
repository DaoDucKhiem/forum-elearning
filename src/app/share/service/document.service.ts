import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';
import { ServerResponse } from '../model/server-response';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService<object>{

  constructor(
    public http: HttpService
  ) {
    super(http, "documents");
  }

  /**
   * lấy danh sách document paging
   * dùng cho tìm kiếm global,
   * tìm kiếm theo chuyên mục
   * @param param 
   * ddkhiem
   */
  getDocPaging(param: object): Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/documentPaging`, param)
  }
}
