import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }//we inject it for the search method

  ngOnInit(): void {
  }

  doSearch(value: string){

    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);//value here it's representing the keyword from {path: 'search/:keyword', component: ProductListComponent},

  }

}
