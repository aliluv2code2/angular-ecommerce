import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId:number =1;
  currentCategoryName: string;// added it to show the name of category when someone press on it, still not working hahah
  searchMode: boolean =false;// added it for search method 
  previousCategoryId: number=1;

  //new proprties for the pagination

  thePageNumber :number =1;
  thePageSize=10;
  theTotalElements: number=0;

  previousKeyword: string=null;


  constructor(private productService :ProductService,
              private cartService : CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
    this.listProducts();
  });
}
  listProducts(){
    
    this.searchMode=this.route.snapshot.paramMap.has("keyword");// here check the keyword if it's exist or not 
    if(this.searchMode){//if there is a keyword
    this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
    handleSearchProducts(){
      
      const theKeyword : string= this.route.snapshot.paramMap.get("keyword");
      
      // id we have a different keyword than the previous
      //then set thePageNumber =1

      if(this.previousKeyword !=theKeyword){
        this.thePageNumber=1;
      
      }

      this.previousKeyword=theKeyword;
      
      //this code console..... jujst for debug the code
      console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
      //now we need to search for the products by giving keyword

      this.productService.searchProductsPaginate(this.thePageNumber-1,
                                                this.thePageSize,
                                                theKeyword).subscribe(this.processResult());
        
    }

  //this method for showing all the products depends on the category and for now we are not using it because I want to show all the 100 products
  handleListProductsCategorys(){//added for search by keywords
    //check if the "id" parameter is availabe
    const hasCategoryId :boolean= this.route.snapshot.paramMap.has('id');// here check if has a category id 
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
 
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else{
      // not category id availble ... default to category id 1
      this.currentCategoryId=1;
      this.currentCategoryName = 'Books';
    }

    // check if we have different category than previous
    //note: Angular will reuse a component if it is currently being viewed 

    //if we have different category id than previous 
    // then set thePageNumber back to 1

    if(this.previousCategoryId !=this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId=this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    // now get the products for the given category id 
    this.productService.getProductListPaginate(this.thePageNumber-1,// -1 to handle the diffrent between the front and back end 
                                                this.thePageSize,
                                                this.currentCategoryId).subscribe(this.processResult());
     

  }

  handleListProducts() { //this method for showing all the products not depends on the category
    // check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {

      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }
    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //
    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

   if(hasCategoryId) {
    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
    }
    else{
      this.productService.getProductListPaginateNoCategory(this.thePageNumber - 1,
        this.thePageSize)
        .subscribe(this.processResult());
    }
  }
  processResult() {// it's the results comming from JSON backend part
    return data =>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1; // +1 to handle the diffrent between the front and back end
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }

  updatePageSize(pageSize:number){
    this.thePageNumber=pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

  }
}
