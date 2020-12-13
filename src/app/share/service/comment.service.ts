import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';
import { ServerResponse } from '../model/server-response';

@Injectable({
    providedIn: 'root'
})
export class CommentService extends BaseService<object>{

    constructor(
        public http: HttpService
    ) {
        super(http, "comments");
    }


    /**
     * lấy comment theo id tài liệu
     * @param id id của tài liệu
     */
    getCommentByDocId(id: number): Observable<ServerResponse> {
        return this.http.get(`${this.getApiURL()}/${id}`);
    }

    // xóa comment
    deleteComment(id: number): Observable<ServerResponse> {
        return this.http.delete(`${this.getApiURL()}/${id}`);
    }
}
