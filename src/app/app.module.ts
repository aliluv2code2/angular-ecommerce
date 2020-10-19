import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';// I added it for the pagenation 
import { ReactiveFormsModule } from '@angular/forms';

//we added it to select by products, Books, coffee mage and so on and the category/:id is from the DB table
const routes: Routes=[
    {path: 'checkout', component: CheckoutComponent},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'products/:id', component: ProductsDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category/:id/:name', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo:'/products',pathMatch: 'full'},
    {path: '**', redirectTo:'/products',pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchComponent,
    ProductsDetailsComponent,
    ProductCategoryMenuComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),// routes is from the const routes: Routes=[ above
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule //we add here the supports we need to our project 
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
