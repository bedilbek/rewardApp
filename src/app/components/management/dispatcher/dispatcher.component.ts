import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdersComponent } from '../../orders/orders.component';
import { DriversService, OrdersService, AuthService, DispatchersService } from '../../../core';
import * as moment from 'moment';
@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})

export class DispatcherComponent implements OnInit{
  constructor(
    private dialog: MatDialog,   
    private driversAPI: DriversService,
    private dispatchersAPI: DispatchersService,
    private ordersAPI: OrdersService,
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
    this.dispatchersAPI.retrieve(this.authAPI.id).subscribe(res=>{
      this.dataSource = res.drivers
      this.dispatcher = res
    })  
  }
  
  sortOrders(orders, day){
    return orders.filter(order => moment(order.created_at).format('dddd') === day)  
    }

  

  getOrders(orders,day, driver_id ){
    let list_orders = this.sortOrders(orders,day)
    this.dialog.open(OrdersComponent, {
      width: '400px',
      height: '400px',
      data: { dispatcher_id: this.authAPI.id, driver_id: driver_id, orders: list_orders }
    }).afterClosed().subscribe(refresh => {
      console.log(refresh)
      if (refresh) {

        }
        })
      }
  
}
