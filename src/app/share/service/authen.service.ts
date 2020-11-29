import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private http: HttpClient) { }

  /**
   * lấy token trả về bên tích hợp
   * @param sid 
   * created by ddkhiem
   */
  getToken(sid: any): Observable<any> {
    return this.http.get(`http://apigateway.toedu.me/auth/api/intergrates/token?sid=${sid}`);
  }

  /**
   * kiểm tra token hợp lệ hay không
   * @param token
   * ddkhiem
   */
  checkToken(token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token,
        "Content-Type": "application/json",
      })
    };
    return this.http.get(`http://apigateway.toedu.me/auth/api/intergrates/authen`, httpOptions);
  }
}
