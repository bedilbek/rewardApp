import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../base';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends CoreService {
  constructor(http: HttpClient) {
    super('orders', http);
  }
}
