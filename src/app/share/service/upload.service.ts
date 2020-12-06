import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  //upload file lên serve stringee
  uploadFile(file: FormData): Observable<any> {
    var userData = localStorage.getItem("UserData");
    var token = JSON.parse(userData)["StringeeToken"];
    const httpOptions = {
      headers: new HttpHeaders({
        'X-STRINGEE-AUTH': token,
      })
    };
    return this.http.post(`https://api.stringee.com/v1/file/upload?uploadType=multipart`, file, httpOptions);
  }
}
