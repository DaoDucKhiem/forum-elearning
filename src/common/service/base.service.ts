import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/share/model/app-config';
import { BaseEntity } from 'src/app/share/model/base-entity';
import { ServerResponse } from 'src/app/share/model/server-response';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

export class BaseService<T extends BaseEntity> {

  protected hostApi;

  constructor(
    protected http: HttpService,
    protected controller: string
  ) {
    this.hostApi = (ConfigService.settings as AppConfig).apiServer;
  }

  // lấy về chuỗi url
  getApiURL() {
    const lastCharacter = this.hostApi.substr(this.hostApi.length - 1);
    if (lastCharacter === '/') {
      return `${this.hostApi}${this.controller}`;
    }
    return `${this.hostApi}/${this.controller}`;
  }

  // lưu dữ liệu
  save(data: T, opt?: object): Observable<ServerResponse> {
    return this.http.post(`${this.getApiURL()}/save`, data);
  }
}
