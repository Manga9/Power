import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit, OnDestroy {

  topProducts: any = []
  getTopProducts?: Subscription

  constructor(private proServ:ProductService) { }

  ngOnInit(): void {
    this.getTopProducts = this.proServ.getAllProducts().subscribe(result => {
      result.forEach(element => {
        if(this.topProducts.length < 4) {
          this.topProducts.push(element)
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.getTopProducts?.unsubscribe()
  }

}
