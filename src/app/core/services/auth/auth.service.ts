import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { Router } from "@angular/router";
import { CoreHTTPService } from "../base";
import { UsersService } from "../api";
import { throwError } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class AuthService extends CoreHTTPService {
  isAdmin;

  constructor(
    http: HttpClient,
    private router: Router,
    private userAPI: UsersService,
  ) {
    super(http)
  }

  login(email: string, password: string, token?) {
    return this.userAPI.authenticate(email, password, { push_token: token }).pipe(
      tap(
        (res: any) => {
          console.log(res)
          this.user = res.user
          this.setToken(res.key, res.created_at, res.expire_time_in_seconds)
          this.navigateToURL()
        }, () => {
          this.logout()
        }),
        catchError(err => {
        if (err.status == 400) {
            Object.keys(err.error).forEach(k => {
                console.log(err.error)
            })
        }
        return throwError(err)
      })
    )
  }

  navigateToURL() {
    this.router.navigateByUrl('/dispatchers')
  }

  logout() {
    if (this.getToken()) this.userAPI.logout().pipe(finalize(() => localStorage.clear())).subscribe()
  }

  set user(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'))
  }

  get id() {
    return this.user.role_id
  }

  get email() {
    return this.user.email
  }

  get name() {
    let name = `${this.user.first_name} ${this.user.last_name}`
    return name.trim() == "" ? this.user.email : name
  }

  get phone_number() {
    return this.user.phone_number
  }

  getToken() {
    let keyobj = localStorage.getItem("token")
    if (keyobj) {
      try {
        return JSON.parse(keyobj).key
      } catch {
        localStorage.clear()
        this.getToken()
      }
    }
  }

  setToken(key, created_at, expire_time_in_seconds) {
    let keyobj = JSON.stringify({ key: key, created_at: created_at, expire_time_in_seconds: expire_time_in_seconds })
    localStorage.setItem("token", keyobj)
  }

  isLoggedIn() {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl('/login')
      return false;
    }
    return true;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
