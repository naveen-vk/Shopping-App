import { BookData } from './book-data.model'
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../book.service';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addbook!: FormGroup;
 
  constructor(public fb:FormBuilder,private bookservice: BookService,private searchService:SearchService) { }
  products:any;
  searchtext:any;
  searched:any;
  titleb:string="";
  bookdetail:any;
  book:any;
  books: any[]=[];
  ngOnInit() {
    this.addbook=this.fb.group({
      title: new FormControl('',[
        Validators.required,
      ]),
        pageCount: new FormControl('',[
          Validators.required,
        ]),
        publishdate: new FormControl(''),
        thumbnailUrl: new FormControl('',[
          Validators.required,
        ]),
        shortDescription: new FormControl('',[
          Validators.required,
        ]),
        longDescription: new FormControl('',[
          Validators.required,
        ]),
        price: new FormControl('',[
          Validators.required,
        ]),
         currency: new FormControl('',[
          Validators.required,
        ]),
        discount: new FormControl('',[
          Validators.required,
        ]),
        authors: new FormControl('',[
          Validators.required,
        ]),
        categories: new FormControl('',[
          Validators.required,
        ]),
        




})
this.readbooks();
  }


get title():AbstractControl{
  return this.addbook.controls['title'];
}
get pageCount(): AbstractControl{
  return this.addbook.controls['pageCount'];
}
get publishdate(): AbstractControl{
  return this.addbook.controls['publishdate'];
}
get thumbnailUrl(): AbstractControl{
  return this.addbook.controls['thumbnailUrl'];
}
get shortDescription(): AbstractControl{
  return this.addbook.controls['shortDescription'];
}
get longDescription(): AbstractControl{
  return this.addbook.controls['longDescription'];
}
get price(): AbstractControl{
  return this.addbook.controls['price'];
}
get currency(): AbstractControl{
  return this.addbook.controls['currency'];
}
get discount(): AbstractControl{
  return this.addbook.controls['discount'];
}
get authors(): AbstractControl{
  return this.addbook.controls['authors'];
}
get categories(): AbstractControl{
  return this.addbook.controls['categories'];
}
 
readbooks(){
  this.bookservice.readbooks().subscribe(
    data=>{
      console.log(data);
      this.books=[Object.values(data)];
    console.log(typeof(this.books));
    },
    error=>{
      console.log(error);
    }
  )
}
datacapture(){
  console.log(this.addbook.value);
  // console.log(this.publishdate.value);
 this.bookservice.addbook(this.title.value, this.pageCount.value,this.publishdate.value,this.thumbnailUrl.value,
   this.shortDescription.value,this.longDescription.value,this.authors.value,this.categories.value,this.price.value,
   this.currency.value,this.discount.value);
   this.addbook.reset();

}

find(text:any){
  this.searchService.find(text).subscribe(data=>{
    return this.searched=data;
  })
 }

 bookdelete(isbn:any){
   this.bookservice.deleteBook(isbn).subscribe(data=>{
    window.location.reload();
   });
   console.log(isbn);
   //window.location.reload();
 }

 showdata(isbn:any){
  this.bookservice.getproduct(isbn).subscribe((data)=>{
    this.bookdetail=data;
    console.log(this.bookdetail);
    this.book=this.bookdetail[0];
    this.fillform()
  }) 
}

fillform(){
  this.addbook.patchValue({

     title:this.book.title,
  
     pageCount:this.book.pageCount,
     publishedDate:this.book.publishedDate,
     thumbnailUrl:this.book.thumbnailUrl,
     shortDescription:this.book.shortDescription,
     longDescription:this.book.longDescription,
     status:this.book.status,
     authors:this.book.authors,
     categories:this.book.categories,
     price:this.book.price,
     currency:this.book.currency,
     discount:this.book.discount

    })
}


updateproduct(){
  const id=this.book.isbn;
  console.log(id);
this.bookservice.updateproduct(this.addbook.value,id).subscribe((data)=>{
  console.log(data);
});
window.location.reload();
}

}