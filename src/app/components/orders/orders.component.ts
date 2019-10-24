import { Component, OnInit, Inject } from '@angular/core';
import { DriversService, OrdersService } from '../../core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  editing=false;
  adding =false;
  refresh;
  myForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      created_at: "",
      updated_at: ""
      });
  }

  editOrder(id){
    this.editing = true
    this.ordersAPI.retrieve(id).subscribe(res=>{
      this.myForm.patchValue(res)
    })
  }
  
  addOrder(){
    this.adding = true
  }
  createOrder(){
    this.ordersAPI.create(this.myForm.value).subscribe(res=>{
      if(res.created_at){
        this.refresh = true
      }
    })
  }
}
