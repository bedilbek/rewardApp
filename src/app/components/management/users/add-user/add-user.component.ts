import { Component, OnInit, Self } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DispatchersService } from "../../../../core";

export interface Icon_Name {
  type: string;
  icon: string;
}

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})

export class AddUserComponent implements OnInit {
  userID;
  myForm: FormGroup;
  passwordsMatch = true;
  teams: string;
  showPassword: boolean = false
 
  constructor(
    private dispatchersAPI: DispatchersService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      id:"",
      user: this.fb.group({
        id:"",
        first_name: ["", [Validators.required]],
        username: ["", [Validators.required]],
        last_name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        phone_number: ["", [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
      }),
      legs_choice_for_90: 0,
      legs_choice_for_80: 0,
      legs_choice_for_70: 0,
      plan_gross: 0,
      reward_percentage_for_drivers: 0
     });

     this.route.params.subscribe(res => {
      this.userID = res["id"];
    });

    if (this.userID) {
      this.dispatchersAPI.retrieve(this.userID).subscribe(res => {
        this.myForm.patchValue(res);
        console.log(this.myForm.value)
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  submit() {

    if (this.userID) {
      this.dispatchersAPI.update(this.myForm.getRawValue()).subscribe(res => {
        this.snackBar.open("Success! Update successful.", "OK");
        this.router.navigate(["/users/"]);
      });
    } else {
      this.dispatchersAPI.create(this.myForm.getRawValue()).subscribe(res => {
        console.log("USER ADD => ", res);
        this.snackBar.open("Success! Addition successful.", "OK");
        this.router.navigate(["/users/"]);
      });
    }
  }

  delete() {
    this.dispatchersAPI.delete(this.userID).subscribe(res => {
      this.snackBar.open("Success! Delete successful.", "OK");
      this.router.navigate(["/users/"]);
    });
  }

}
