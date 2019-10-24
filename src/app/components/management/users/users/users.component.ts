import { Component, OnInit } from '@angular/core';
import { DispatchersService } from '../../../../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private dispatchersAPI: DispatchersService) { }
  title = "Users"
  displayedColumns: string[] = ['username', 'fullname', 'phone_number', 'update'];
  dataSource = []
  
  ngOnInit() {
    this.getUsers()
  }
  getUsers(){
    this.dispatchersAPI.list().subscribe(res=> {
      this.dataSource = res.results
    })
  }

}
