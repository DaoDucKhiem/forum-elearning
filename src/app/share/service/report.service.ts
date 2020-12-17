import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';
import { ServerResponse } from '../model/server-response';


@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService<object>{

  constructor(
    public http: HttpService
  ) {
    super(http, "reports");
  }

  /**
     * lấy danh sách báo cáo
     */
  getAllReport(): Observable<ServerResponse> {
    return this.http.get(`${this.getApiURL()}/getAll`);
  }

  changeStatusReport(id: number): Observable<ServerResponse> {
    return this.http.put(`${this.getApiURL()}/update/${id}`);
  }

  DeleteReport(id: number): Observable<ServerResponse> {
    return this.http.delete(`${this.getApiURL()}/${id}`);
  }
}
