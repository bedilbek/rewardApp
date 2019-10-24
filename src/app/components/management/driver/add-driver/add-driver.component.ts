import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DispatchersService } from '../../../../core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
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
      user: {
        id:"",
        first_name: ["", [Validators.required]],
        username: ["", [Validators.required]],
        last_name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        phone_number: ["", [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
      }
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
    let data  = {
      user: this.myForm.getRawValue()
    }
    if (this.userID) {
      this.dispatchersAPI.update(data).subscribe(res => {
        this.snackBar.open("Success! Update successful.", "OK");
        this.router.navigate(["/users/"]);
      });
    } else {
      this.dispatchersAPI.create(data).subscribe(res => {
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
