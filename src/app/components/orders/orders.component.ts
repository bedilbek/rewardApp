import { Component, OnInit, Inject } from '@angular/core';
import { DriversService, OrdersService } from '../../core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DispatcherComponent } from '../management/dispatcher/dispatcher.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  editing=false;
  adding =false;
  refresh;
  orderID
  myForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef:MatDialogRef<DispatcherComponent>,
    private ordersAPI: OrdersService,
    private fb: FormBuilder,
    ) { }
  panelOpenState = false;

  ngOnInit() {
    this.myForm = this.fb.group({
      id:"",
      string_id: "",
      driver: this.data.driver_id,
      driver_username: "",
      location_from: "",
      location_to: "",
      price: 0,
      assigned_date:this.data.day,
      created_at: "",
      updated_at: ""
      });
  }

  editOrder(id){
    this.orderID = id
    this.editing = true
    this.ordersAPI.retrieve(id).subscribe(res=>{
      this.myForm.patchValue(res)
    })
  }
  
  addOrder(){
    this.adding = true
  }
  closeDialog(){
    this.dialogRef.close();
  }
  createOrder(){
    if(this.myForm.controls.id == this.orderID)
      this.ordersAPI.update(this.myForm.value).subscribe(res=>{
        this.refresh = true
        this.closeDialog()
      })
    else this.ordersAPI.create(this.myForm.value).subscribe(res=>{
      if(res.created_at){
        this.refresh = true
        this.closeDialog()
      }
    })
  }
}
