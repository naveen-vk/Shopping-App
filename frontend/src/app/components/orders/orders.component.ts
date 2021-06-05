import { OrderService } from 'src/app/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderData } from '../adminorders/order-data.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit,OnDestroy {
  orders:OrderData[]=[];
  private postsSub:any;
  email=localStorage.getItem('email');
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.Orders();
    this.postsSub = this.orderService.getOrderUpdateListener()
      .subscribe((orders: OrderData[]) => {
        console.log(orders);
        
        this.orders = orders;
        console.log(this.orders);
      });
    
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
