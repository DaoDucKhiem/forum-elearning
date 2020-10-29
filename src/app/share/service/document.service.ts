import { Injectable } from '@angular/core';
import { BaseService } from 'src/common/service/base.service';
import { HttpService } from 'src/common/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService<object>{

  constructor(
    public http: HttpService
  ) {
    super(http, "document");
  }
}
