import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product : Product = new Product();// we added the new Product() to avoid the error happen behind the seen when we choose a product

  constructor( private productservice:ProductService,
               private cartservice:CartService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { 
      this.hanleProductDetails();
    })
  }
  hanleProductDetails() {
    //get the id param string and convert it to nr by adding +

    const theProductId : number= +this.route.snapshot.paramMap.get("id");

    this.productservice.getProduct(theProductId).subscribe( 
      data =>{
        this.product=data;
    }
    )
  }

  addToCard(){
    
    console.log(`Adding to the Cart: ${this.product.name} ${this.product.unitPrice}`);
    const theCartItem= new CartItem(this.product);
    this.cartservice.addToCart(theCartItem);

  }

}
