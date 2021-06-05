import { UserService } from 'src/app/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate{
  
    constructor(private authService:UserService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot
         ): boolean | UrlTree | Observable<boolean 
         | UrlTree> | Promise<boolean | UrlTree> {
             const isAuth=Boolean(this.authService.getIsAuth());
             if(!isAuth){
              this.router.navigate(['/**']);
             }
        return isAuth;
    }

}