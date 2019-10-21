import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export abstract class CoreHTTPService {

  protected baseURL: string;

  constructor(protected http: HttpClient) {
    this.baseURL = `${environment.apiUrl}`;
  }

  protected get(relativeURL: string, params?: HttpParams | {
    [param: string]: string | string[];
  }): Observable<any> {
    return this.http.get(this.baseURL + relativeURL, {
      params: params
    })
  }

  protected put(relativeURL: string, body: any) {
    return this.http.put(this.baseURL + relativeURL, body)
  }

  protected post(relativeURL, body: any, headers?: HttpHeaders) {
    return this.http.post(this.baseURL + relativeURL, body, {
      headers: headers
    })
  }

   protected core_delete(relativeURL: string) {
    return this.http.delete(this.baseURL + relativeURL)
  }

}
