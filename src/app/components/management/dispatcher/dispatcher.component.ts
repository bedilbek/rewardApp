import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdersComponent } from '../../orders/orders.component';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})

export class DispatcherComponent implements OnInit{
  constructor(private dialog: MatDialog){

  }
  title = "Dispatchers Calendar"
  displayedColumns: string[] = ['driver', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'sum'];
  dataSource = []
  drivers = [
    {
      name: "Navruzbek",
      orders: [
        {
          id:"qwe",
          date:"7/10/19"
        },
        {
          id:"qwe",
          date:"8/10/19"
        },
        {
          id:"qwe",
          date:"8/10/19"
        },
        {
          id:"qwe",
          date:"9/10/19"
        },
        {
          id:"qwe",
          date:"10/10/19"
        },
      ],
      sum: "10 000"
    },
    {
      name: "Islombek",
      orders: [
        {
          id:"qwe",
          date:"7/10/19"
        },
        {
          id:"qwe",
          date:"9/10/19"
        },
        {
          id:"qwe",
          date:"10/10/19"
        },
        {
          id:"qwe",
          date:"10/10/19"
        },
        {
          id:"qwe",
          date:"11/10/19"
        },
      ],
      sum: "10 000"
    },
    {
      name: "Jasur",
      orders: [
        {
          id:"qwe",
          date:"7/10/19"
        },
        {
          id:"qwe",
          date:"7/10/19"
        },
        {
          id:"qwe",
          date:"7/10/19"
        },
        {
          id:"qwe",
          date:"7/10/19"
        },
        {
          id:"qwe",
          date:"7/10/19"
        },
      ],
      sum: "10 000"
    }
  ]
  
  ngOnInit(){
    this.dataSource = this.drivers
  }
  getOrders(order){
    this.dialog.open(OrdersComponent, {
      width: '400px',
      height: '400px'
    })
  }
}
