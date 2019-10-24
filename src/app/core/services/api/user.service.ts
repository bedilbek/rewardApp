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
  authUrl =  'auth/login/'
  
  constructor(http: HttpClient) {
    super('users', http);
  }

  authenticate(email, password, options?: { push_token?: string }): Observable<any> {
    
    let body = {
      email: email.trim(),
      password: password,
    }

    if (options && options.push_token) {
      body["push_token"] = options.push_token
    }

    return this.post(this.authUrl, body)
  }

  logout() {
    return this.post(this.relativeBase + 'auth/logout/', {}).pipe(exhaustMap((obj, index) => of(obj)))
  }
}
