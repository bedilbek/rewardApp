import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `<router-outlet><app-spinner></app-spinner></router-outlet>`
})
export class MainComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    
  }
}
