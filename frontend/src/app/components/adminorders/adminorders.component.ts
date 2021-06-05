import { OrderData } from './order-data.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';


@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit,OnDestroy {
  orders:OrderData[]=[];
  private postsSub:any;
  constructor(private orderService: OrderService) { }
     
  ngOnInit(): void {

    this.orderService.getOrder();
    this.postsSub = this.orderService.getOrderUpdateListener()
      .subscribe((orders: OrderData[]) => {
        console.log(orders);
        this.orders = orders;
        console.log(this.orders);
      });
    

}

  updatestatus(orderId:any){
    this.orderService.updatestatus(orderId);
    window.location.reload();
    
  }
ngOnDestroy() {
  this.postsSub.unsubscribe();
}
  }


