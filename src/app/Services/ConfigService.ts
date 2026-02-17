import { inject, Injectable } from '@angular/core';
import { Config } from '../Model/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private url = 'http://localhost:8080/empresa-app/config';

  private httpConfig = inject(HttpClient);

  obtenerConfiguraciones(): Observable<Config[]> {
    return this.httpConfig.get<Config[]>(this.url);
  }

  guardarConfig(config: Config): Observable<Config> {
    return this.httpConfig.post<Config>(this.url, config);
  }
  updateConfig(config: Config) {
    return this.httpConfig.put<Config>(this.url, config);
  }
}
