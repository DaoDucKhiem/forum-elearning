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
    const httpOptions = {
      headers: new HttpHeaders({
        'X-STRINGEE-AUTH': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InN0cmluZ2VlLWFwaTt2PTEifQ.eyJqdGkiOiJTS0d6Qm5xRWJzb0RFT3FzTEpxZWZ0d2k1Y0Y2RXEwUUVpLTE2MDQ1ODU1MTMiLCJpc3MiOiJTS0d6Qm5xRWJzb0RFT3FzTEpxZWZ0d2k1Y0Y2RXEwUUVpIiwiZXhwIjoxNjA1MTkwMzEzLCJ1c2VySWQiOiI1Zjk1NDE1ZWYzMzliMjAwMTdmZjliNzAiLCJmdWxsTmFtZSI6Ilh1w6JuIETFqW5nIiwiZW1haWwiOiJkdW5nMUB2bnUuZWR1LnZuIiwicGhvbmUiOiIwOTc1MjU1NjUwIiwicGFzc3dvcmRVcGRhdGVUaW1lIjoiMjAyMC0xMC0yNVQwOToxMTo1OC4wMTlaIiwiaWF0IjoxNjA0NTg1NTEzfQ.eL65QOq_yrz658fiMQ-JgTL_ICQogD7V22qlgMPZcvY",
      })
    };
    return this.http.post(`https://api.stringee.com/v1/file/upload?uploadType=multipart`, file, httpOptions);
  }
}
