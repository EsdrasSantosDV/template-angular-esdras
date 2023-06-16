import {Inject, Injectable} from '@angular/core';
import {ENV_CONFIG, EnvironmentConfig} from "./environment-config.interface";
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataGenericServiceService {
  public apiUrl: string;

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getAll<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}`)
  }

  add<T,P>(path:string,payload:P):Observable<T>{
      return this.http.post<T>(`${this.apiUrl}/${path}`,payload);
  }

  patch<T,P>(path:string,payload:P):Observable<T>
  {
    return this.http.patch<T>(`${this.apiUrl}/${path}`,payload);
  }


}
