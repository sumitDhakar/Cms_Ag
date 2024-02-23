import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../entites/user-registration';
import { environment } from 'src/environments/environment';
import { Auth } from '../entites/auth';
import { Users } from '../entites/users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChangePassword } from '../payload/ChangePasswordUtils';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<any>(null);
  loggedInUser:Observable<any> = this.user.asObservable();

  public email = new BehaviorSubject<any>(null);
  changeEmail:Observable<any> = this.email.asObservable();

  public myOtp = new BehaviorSubject<any>(null);
  usedOtp:Observable<any> = this.myOtp.asObservable();
  

  baseUrl = environment.hostUrl+"/auth"

  constructor(private httpClient:HttpClient,private snack:MatSnackBar,private router:Router,private location:Location) { }

  // user registration
  registration(userRegistration:UserRegistration){
    return this.httpClient.post(`${this.baseUrl}/signup`,userRegistration);
  }

  // user login
  login(authRequest:Auth){
      return this.httpClient.post(`${this.baseUrl}/signin`,authRequest);
  }


  // user changePassword
  changePassword(old:string,newPassword:string){
    return this.httpClient.get(`${this.baseUrl}/changePassword/${old}/${newPassword}`);
}
  // getting current login user
  getCurrentUser(){
     return this.httpClient.get(`${this.baseUrl}/current-user`);
  }

// setting user to local storage
  setUser(user:Users){
    localStorage.setItem("user",JSON.stringify(user));
  }

  // setting token to local storage
  setToken(token:string){
    localStorage.setItem("token",token);
  }

  // get token from local Storage
  getToken(){
     let token=localStorage.getItem("token");
     if(token==undefined || token.length<1)
     return null;
    return token;
  }


  // getting user from local storage
  getUser(){
    let user=localStorage.getItem("user");
    if(user==undefined)
    return null;
  return JSON.parse(user);
  

  }

  // clearing local storage
  logoutUser(){
    localStorage.clear();
    
  }

  // get roles of logged in user
  getUserRoles(){
    let user = this.getUser();
  let roles:string[]=[];
    if(user!=null || user!==undefined)
    {
         user.userRoles.forEach((r:any) => {
            roles.push(r.roles.title);
         });
    return roles;
    }
  return null;
  }

  // get all permission access to the user
  getPermissionAccess(){
    return this.httpClient.get(`${this.baseUrl}/access`);
  }

  // fetching that user is permited for url or not
  isPermitted(url:any):Promise<boolean>{
    let promise:Promise<boolean> = new Promise((resolve,reject)=>{
      this.httpClient.get(`${this.baseUrl}/isPermitted?url=${url}`).subscribe((data:any)=>{
        console.log(data);
        
        resolve( data);
       },(err)=>{
           if(err.status==401){
            this.snack.open("Session Expired ","Login",{
              duration:3000,
            });
            this.router.navigate(['login'])
           }
       });
    })
    let isPermit = promise.then(result=>{
      return result;
    })

    return promise;
    
  }
  isUserPermitted(url:any,isGuard:Boolean):Promise<any>{
    let promise:Promise<any> = new Promise((resolve,reject)=>{
      this.httpClient.get(`${this.baseUrl}/isPermitted/${isGuard}?url=${url}`).subscribe((data:any)=>{
        console.log(data);
        
        resolve( data);
       },(err)=>{
           if(err.status==401){
            this.snack.open("Session Expired ","Login",{
              duration:3000,
            });
            this.router.navigate(['login'])
           }
       });
    })
    let isPermit = promise.then(result=>{
      return result;
    })

    return promise;
    
  }
  

// adding employees
addEmployeeBasicDetails(user: Users) {
  const headers = new HttpHeaders({
    'enctype': 'multipart/form-data'
    //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
  });
     const formData = new FormData();
  
  
     if(user.userImage!=null)
     {
    formData.append("files[]",user.userImage);
     }
  
    else
    {
    formData.append("files[]",'null');
    }
  
    
     formData.append("data",new Blob([JSON.stringify(user)],{type:'application/json'}));
  
  
     return this.httpClient.put(`${this.baseUrl}/basicDetails`,formData,{headers});
    }
  


  // otp verification 
  verifyUser(email:string,otp:string){
    return this.httpClient.get(`${this.baseUrl}/verifies?email=${email}&&value=${otp}`)
  }

    // resend otp verification 
    resendOptForEmailVerification(email:string,forType:string){
      return this.httpClient.get(`${this.baseUrl}/resend?email=${email}&forType=${forType}`)
    }

    changeForgetPassword(auth:Auth, otp:any){
      return this.httpClient.put(`${this.baseUrl}/forget?otp=${otp}`,auth)
    }
  
   // fetching is user logged in
  isLoggedIn(){
    let token =this.getToken();
    if(token!=null)
    return true;
  return false;
  }


  // getting permission for logged in user for sidenav access
   getSideNavPermission(){
    return this.httpClient.get(`${this.baseUrl}/sidenav`);
   }


  async setPermissions(location:Location){
    return  await this.isUserPermitted(location.path(),false).then(data=>{
        if(data==null)
        this.router.navigate(['dollop']);
       return    data;
     }) 
   }

   navigate(path:string){
     this.router.navigate([`${path}`]);
   }

  isTokenExpired(){
   let token= this.getToken();
   if(token!=null)
   {
   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
   return (Math.floor((new Date).getTime() / 1000)) >= expiry;
   }
   return false;
  }


  
  private updateRoutes() {
    // // Dynamically update routes based on user roles
    // this.getUserRoles()!.forEach(role => {
    //   if (role === 'admin') {
    //     this.router.config.unshift({ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) });
    //   } else if (role === 'employee') {
    //     this.router.config.unshift({ path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) });
    //   }
    //   // Add more conditions for other roles if needed
    // });
  }

  getUrl(){
    if(this.getUserRoles()?.includes("ADMIN"))
             return '/dollop'
            else if(this.getUserRoles()?.includes("EMPLOYEE"))
     return '/employee-dash'
  return "/login";
}
}