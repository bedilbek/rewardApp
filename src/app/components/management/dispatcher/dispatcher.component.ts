import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrdersComponent } from '../../orders/orders.component';
import { DriversService, OrdersService, AuthService, DispatchersService } from '../../../core';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})

export class DispatcherComponent implements OnInit{
  constructor(
    private dialog: MatDialog,   
    private dispatchersAPI: DispatchersService,
    private authAPI: AuthService
 ){

  }

  title = "Dispatchers Calendar"
  displayedColumns: string[] = ['driver', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'sum'];
  dataSource = []
  dispatcher;
  ordersByDate;
  ngOnInit(){
    this.retrieveDrivers()
  }

  retrieveDrivers(){
    if(this.authAPI.superuser){
        const dialogRef = this.dialog.open(DialogChooseDispatcher, {
          width: '250px',
        }).afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.dispatcher = result.data
          this.dispatchersAPI.retrieve(result.data.id).subscribe(res=>{
            this.dataSource = res.drivers
            this.dispatcher = res
          }) 
        });
      
    }
    else this.dispatchersAPI.retrieve(this.authAPI.id).subscribe(res=>{
      this.dataSource = res.drivers
      this.dispatcher = res
    })  
  }
  
  sortOrders(orders, day){
    return orders.filter(order => moment(order.assigned_date).format('dddd') === day)  
  }

  getDates(day){
    if(day==="Sunday") return moment().startOf('isoWeek').day(day).add(7, 'days').format()
    else return moment().startOf('isoWeek').day(day).utc().format()
  }

  getOrders(orders,day, driver_id ){
    let list_orders = this.sortOrders(orders,day)
    this.dialog.open(OrdersComponent, {
      width: '400px',
      height: '400px',
      data: { dispatcher_id: this.authAPI.id, driver_id: driver_id, orders: list_orders, day: this.getDates(day)  }
    }).afterClosed().subscribe(refresh => {
        console.log(refresh)
        this.retrieveDrivers()
      })
    }
  
}


@Component({
  selector: 'dialog-choose-dispatcher',
  templateUrl: 'choose-dispatcher.html',
})
export class DialogChooseDispatcher implements OnInit{
  email
  myForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DispatcherComponent>,
    private fb: FormBuilder,
    private dispatchersAPI: DispatchersService
   ){}

  ngOnInit(){
    this.myForm = this.fb.group({
      email:""
    })
  }

  findDispatcher(){
    this.dispatchersAPI.search(this.myForm.controls.email.value).subscribe(res=>{
      this.onNoClick(res.results[0])
    })
  }
  onNoClick(dispatcher): void {
    this.dialogRef.close({data: dispatcher});
  }

}
