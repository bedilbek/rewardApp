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

  // MARK: Utility Functions For User Object
  set user(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
    this.company = user.memberships.company[0];
    this.permissions = user
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'))
  }

  get id() {
    return this.user.id
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

  // Permissions
  set permissions(user) {
    let permissions: string[] = user.permissions;
    this.isAdmin = user.is_superuser;
    if (user.is_superuser === true) permissions["superuser"] = [true];
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }

  get permissions() {
    return JSON.parse(localStorage.getItem("permissions"));
  }

  get permissions_boolean() {
    var permissions = { ...this.permissions }
    for (var p in permissions) {
      if (permissions[p].length > 0) {
        permissions[p] = true;
      } else {
        permissions[p] = false;
      }
    }
   if (this.permissions.supervision) {
      Object.keys(this.permissions.supervision).forEach(key => {
        permissions[key] = this.permissions.supervision[key].length > 0
      });
    }
    return permissions
  }

  getPermission(permission) {
    if (!this.permissions) return undefined
    return this.permissions[permission]
  }

  get permittedOffices() {
    let offices = (this.getPermission("supervision") as Array<any>).filter(supervision => supervision["office_id"])
    offices.forEach(element => {
      element["id"] = element["office_id"]
      element["name"] = element["office_name"]
    });
    return offices
  }

  get isCompanySupervisor() {
    return this.permissions_boolean.company == true
  }

  get isOfficeSupervisor() {
    return this.permissions_boolean.office == true
  }

  get isSuperAdmin() {
    let superuser_permissions = this.getPermission("superuser")
    if (superuser_permissions) {
      if (superuser_permissions[0]) return true;
    } else return false;
  }

  set company(company) {
    if (company) {
      localStorage.setItem("company", JSON.stringify(company));
    }
  }

  get company() {
    return localStorage.getItem("company");
  }

  get companyID() {
    if (this.company) return JSON.parse(this.company).id
    else return undefined;
  }

  // MARK: Token Functions
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
