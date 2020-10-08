import { Observable, throwError } from 'rxjs';
import { AppConfig } from 'src/app/share/model/app-config';
import { BaseEntity } from 'src/app/share/model/base-entity';
import { ServerResponse } from 'src/app/share/model/server-response';
import { ConfigService } from '../service/config.service';
import { HttpService } from '../service/http.service';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    protected hostApi;

    constructor(
        protected http: HttpService,
    ) {
    }

    dataUrl = "../../assets/StaticData/document.json"
    getDocuments(): Observable<[]> {
        return this.http.get<any>(this.dataUrl);
    }

}
