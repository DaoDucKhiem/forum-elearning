import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/share/model/app-config';
import { ForumAppConfig } from 'src/app/share/model/config/forum-app-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService<T extends AppConfig> {

  public static settings: ForumAppConfig;

  constructor(protected http: HttpClient) { }

  // lấy file config
  load() {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    return new Promise<void>((resolve, rejects) => {
      this.http.get(jsonFile).toPromise().then((response: any) => {
        ConfigService.settings = response as ForumAppConfig;
        resolve();
      }).catch((response: any) => {
        rejects(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
