import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
  } from "@angular/common/http";
  import { Observable, EMPTY } from "rxjs";
  import { Injectable } from "@angular/core";
  import { tap, first, take, finalize } from "rxjs/operators";
  import { MatDialog } from "@angular/material";
  import { AuthService } from "../services/auth";
  import { Router } from "@angular/router";
  
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private auth: AuthService,
      public dialog: MatDialog,
    ) {
    }
  
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let headers = {}
        if (this.auth.getToken()) headers["Authorization"] = `Bearer ${this.auth.getToken()}`
        if (!req.url.includes("/files/")) {
          // we don't want the request to treat a file upload as json
          headers["Content-Type"] = "application/json";
        }
        req = req.clone({
          setHeaders: headers
        });
  
        // if (!this.isLoggedIn && req.url.includes('logout')) {
        //   return EMPTY
        // }
      
  
      return next.handle(req).pipe(
        finalize(() => { }),
        tap(
          event => {
            if (event instanceof HttpResponse) {
  
            };
          },
          err => {
            if (err) {
              if (err.status == 403) {
                return this.openDialog(
                  "Forbidden :/",
                  "Access to this location is denied"
                );
              }
              if (err.status == 404) {
                return this.openDialog(
                  "404 :(",
                  "The requested resource is not found"
                );
              }
  
              if (err.status == 500) {
                return this.openDialog(
                  "500",
                  "Internal server error. Our development team has been notified. Thank you for your patience."
                );
              }
  
              if (err.status == 401) {
                if (!req.url.includes('logout')) {
                  this.dialog.closeAll()
                }
                return;
              }
              if (err.status == 400) {
                Object.keys(err.error).forEach(k => {
                  if (k == 'sessions') {
                    return err
                  } else {
                    try {
                      this.openDialog("Bad Request", `${k}: ${err.error[k].join(" ")}`);
                    } catch {
                      Object.keys(err.error[k]).forEach(l => {
                        this.openDialog("Bad Request", `${l}: ${err.error[k][l]}`);
                      })
                    }
                  }
                });
                return;
              }
  
              if (err.error.non_field_errors && !this.auth.isLoggedIn())
                return this.openDialog(
                  "Oops!",
                  "Unable to login. Please, check your credentials!"
                );
              if (!req.url.includes("slack")) this.openDialog("Oops!", "Something went wrong.");
            }
          }
        )
      )
    }
  
  
    openDialog(title, text) {
    //   this.modal.openDialog(title, text)
    }
  }
  