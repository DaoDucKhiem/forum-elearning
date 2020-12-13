import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

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
        "Content-Type": "application/json",
      })
    };
    return this.http.get(`http://apigateway.toedu.me/auth/api/intergrates/authen`, httpOptions).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401 || err.status === 403) {
            // Invalidate user session and redirect to login/home
            window.location.href = "http://toedu.me/";
          }

          // return the error back to the caller
          return throwError(err);
        }
      }),
      finalize(() => {
        // any cleanup or final activities
      })
    );
  }
}
