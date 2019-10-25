import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatchersService } from '../../../../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  
  constructor(private dispatchersAPI: DispatchersService) { }
  title = "Users"
  displayedColumns: string[] = ['username', 'fullname', 'phone_number', 'update'];
  dataSource = []

  ngOnInit() {
    this.getUsers()
  }
  
  ngAfterViewInit() {
    this.initPaginator()
  }

  initPaginator() {
    this.getUsers(this.paginator.pageIndex + 1)
  }

  getUsers(page = 1, page_size = 15){
    this.dispatchersAPI.list().subscribe(res=> {
      this.dataSource = res.results
    })
  }

}
