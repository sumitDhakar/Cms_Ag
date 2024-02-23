import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterState, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { RouteUtilService } from '../route-util.service';

@Injectable({
  providedIn: 'root',

},
)
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private routeUtil:RouteUtilService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("inside guard admin");
  
 // state.url= this.modify(state.url)
  this.authService.isUserPermitted(state.url,true).then(result=>{
    
    if(!result){
     this.routeUtil.setWildRoute();
      this.router.navigate(['**']);
    }
  }) 

  return this.authService.isUserPermitted(state.url,true);

  }

  modify(url:string){
    if(url.includes('projects')){
     return    'projects/projects';
    }
    return url;
  }
}