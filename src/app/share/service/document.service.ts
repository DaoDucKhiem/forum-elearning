import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';
import { ParamDoc } from '../model/param/param-doc';
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
   * cập nhật tài liệu
   * @param param tài liệu cập nhật
   */
  updateDocumentData(param: ParamDoc): Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/update`, param)
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

  /**
   * lấy thông tin chung ở dash board
   * ddkhiem
   */
  getInfor(): Observable<ServerResponse> {
    return this.http.get(`${this.getApiURL()}/countDocument`)
  }
  
  /**
   * lấy về danh sách các tài liệu phổ biến ở dash board
   */
  getMostPopularDocument(param): Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/mostPopular`, param);
  }

  /**
   * lấy tài liệu theo id
   * @param id id của tài liệu
   */
  getDocumentById(id: number): Observable<ServerResponse> {
    return this.http.get(`${this.getApiURL()}/getbyid/${id}`);
  }

  /**
   * lấy tài liệu theo id người dùng
   * @param id id của tài liệu
   */
  getDocumentByUserId(id: string, search?: string): Observable<ServerResponse> {
    return this.http.get(`${this.getApiURL()}/${id}?search=${search}`);
  }

  /**
   * tăng lượt xem cho tài liệu
   * @param doc tài liệu cần update
   */
  updateViewDoc(doc: ParamDoc): Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/updateView`, doc);
  }

    /**
   * tăng lượt xem cho tài liệu
   * @param doc tài liệu cần update
   */
  deleteByID(id: number): Observable<ServerResponse> {
    return this.http.delete(`${this.getApiURL()}/${id}`);
  }

  /**
   * tăng lượt xem cho tài liệu
   * @param doc tài liệu cần update
   */
  updateDocument(doc: ParamDoc): Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/updateDocument`, doc);
  }
}
