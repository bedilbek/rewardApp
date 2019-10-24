import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../../../core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(
    private driversAPI: DriversService
  ) { }
  displayedColumns: string[] = ['username', 'fullname', 'email', 'phone_number', 'gross', 'update'];
  dataSource = []
  ngOnInit() {
    this.listDrivers()
  }

  listDrivers(){
    this.driversAPI.list().subscribe(res=>{
      this.dataSource =  res.results
      console.log(this.dataSource)
    })
  }

}
