import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { } //I added HttpClient because I need HttpClient calls 

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginateNoCategory(thePage: number, 
    thePageSize: number): Observable<GetResponseProducts> {
 
    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}`
    + `?page=${thePage}&size=${thePageSize}`;
 
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string):  Observable<Product[]> {
    //  need to build URL based on the category id ..
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(// i can put instead  return this.getProducts(searchUrl);
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number) :Observable<Product> {
    
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId:number ): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    if(!theCategoryId){
    const searchUrl = `${this.baseUrl}`
    + `?page=${thePage}&size=${thePageSize}` ;
    return this.httpClient.get<GetResponseProducts>(searchUrl);

    }else if(theCategoryId){
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    + `&page=${thePage}&size=${thePageSize}` ;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

  // this method to add pagination for the search keyword when we have many products for one keyword
  searchProductsPaginate(thePage: number,
                    thePageSize: number,
                    theKeyword:string ): Observable<GetResponseProducts> {

// need to build URL based on keyword, page and size
const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${thePage}&size=${thePageSize}` ;

return this.httpClient.get<GetResponseProducts>(searchUrl);
}

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {   //I added it to handle the paganation for the project
    size: number, //size of the page 
    totalElements: number, //total number of the elements in the DB
    totalPages: number, // total pages availble
    number: number // current page number 

  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}





