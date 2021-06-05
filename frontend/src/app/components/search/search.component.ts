import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searched:any;
  searchtext:any;
  
  constructor(private searchService:SearchService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.getdata();
  }


  
  getdata(){
    const word=this.route.snapshot.paramMap.get("text");
      this.searchService.find(word).subscribe(data=>{
        return this.searched=data;
      })
   }

   viewdetails(isbn:number){
    this.router.navigate([`/products/${isbn}`]);
  }

}
