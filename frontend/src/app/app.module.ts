import { SearchService } from './search.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { loginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {UserService} from './user.service'
import {BookService} from './book.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor}from './components/login/auth-interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { AdminordersComponent } from './components/adminorders/adminorders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './components/error/error.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatButtonModule} from '@angular/material/button';
import { AdminfeedbackComponent } from './components/adminfeedback/adminfeedback.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { SearchComponent } from './components/search/search.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    loginComponent,
    SignupComponent,
    CartComponent,
    AccountComponent,
    OrdersComponent,
    ProductsComponent,
    NavbarComponent,
    AdminComponent,
    AdminordersComponent,
    ErrorComponent,
    AdminfeedbackComponent,
    ContactusComponent,
    FooterComponent,
    AccountEditComponent,
    SearchComponent,
    WishlistComponent,
    OrderplacedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    ShareButtonModule,
    ShareIconsModule
   
  ],
  providers: [UserService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
                          {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},BookService,SearchService],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
