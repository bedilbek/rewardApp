import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AuthService } from "../../core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {

  requesting: Observable<boolean> = of(false)
  disabled = true;

  form: FormGroup;
  isLoginError: boolean;
  showPassword: boolean = false
  
  constructor(
    private fb: FormBuilder,
    private authAPI: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: "",
      password: [null, Validators.required]
    });

  }

  ngAfterViewInit() {
  }

  onSubmit() {
    let username = this.form.get('username').value
    let password = this.form.get('password').value


    this.authAPI.login(username, password).subscribe(data => {
      console.log(data)
      // if (data.status === 200) {
      //   this.router.navigate(["dashboard"]);
      //   this.Auth.setLoggedIn(true);
      // } else {
      //   this.router.navigate(["login"]);
      // }
    }, err => {
      console.log(err)
    });
  }
}
