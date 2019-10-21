import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreHTTPService } from './http.service';

export abstract class CoreService extends CoreHTTPService {

  constructor(protected endpoint: string, protected http: HttpClient) {
    super(http);
  }

  /* Globally Used Functions */
  list(page = 1, page_size = 15): Observable<any> {
    return this.get(`${this.endpoint}/`, {
      page: `${page}`,
      page_size: `${page_size}`
    })
  }

  retrieve(id): Observable<any> {
    const url = `${this.endpoint}/${id}/`;
    return this.get(url)
  }

  create(model): Observable<any> {
    const url = `${this.endpoint}/`;
    return this.post(url, model)
  }

  update(model): Observable<any> {
    const url = `${this.endpoint}/${model['id']}/`;
    return this.put(url, model)
  }

  save(model) {
    if (model['id']) {
      return this.update(model)
    } else {
      return this.create(model)
    }
  }

  search(search, page=1): Observable<any> {
    const url = `${this.endpoint}/`;
    return this.get(url, {
      page: `${page}`,
      search: search
    })
  }

  delete(id): Observable<any> {
    const url = `${this.endpoint}/${id}/`;
    return this.core_delete(url);
  }

}