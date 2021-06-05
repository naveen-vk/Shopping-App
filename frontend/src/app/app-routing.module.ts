import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
 
import { AuthGuard } from './../auth.guard';
import { AccountEditComponent } from './components/account-edit/account-edit.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { loginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminordersComponent } from './components/adminorders/adminorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminfeedbackComponent } from './components/adminfeedback/adminfeedback.component';
import{ContactusComponent}from './components/contactus/contactus.component'
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { AdminGuard } from 'src/admin.guard';
const routes: Routes = [
  {path:'',         component:HomeComponent},
  {path:'account',  component:AccountComponent, canActivate:[AuthGuard]},
  {path:'cart',     component:CartComponent, canActivate:[AuthGuard]},
  {path:'orders',     component:OrdersComponent, canActivate:[AuthGuard]},
  {path:'admin',     component:AdminComponent, canActivate:[AuthGuard]},
  {path:'adminorders',component:AdminordersComponent, canActivate:[AuthGuard]},
  {path:'adminfeedback',component:AdminfeedbackComponent, canActivate:[AuthGuard]},
  {path:'account-edit/:_id', component:AccountEditComponent, canActivate:[AuthGuard]},
  {path:'orderplaced', component:OrderplacedComponent, canActivate:[AuthGuard]},
  {path:'contactus',    component:ContactusComponent},
  {path:'login',    component:loginComponent},
  {path:'products/:isbn', component:ProductsComponent},
  {path:'wishlist',component:WishlistComponent,canActivate:[AuthGuard]},
  {path:'search/:text',component:SearchComponent},
  {path:'signup',   component:SignupComponent},
  {path:'**',       component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { 

}
