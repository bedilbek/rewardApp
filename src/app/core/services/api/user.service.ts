import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../base';
import { Observable, of } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CoreService {
  
  relativeBase = ''
  authUrl =  'users/me/'
  
  constructor(http: HttpClient) {
    super('users', http);
  }

  authenticate(username, password, options?: { push_token?: string }): Observable<any> {
    
    let body = {
      username: username.trim(),
      password: password,
    }

    if (options && options.push_token) {
      body["push_token"] = options.push_token
    }

    return this.post(this.authUrl, body)
  }

  logout() {
    return this.post(this.relativeBase + 'logout/', {}).pipe(exhaustMap((obj, index) => of(obj)))
  }
}
