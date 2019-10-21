import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }
  title = "Users"
  displayedColumns: string[] = ['username', 'fullname', 'phone_number', 'update'];
  dataSource = []
  
  ngOnInit() {
  }

}
