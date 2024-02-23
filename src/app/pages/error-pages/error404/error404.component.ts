import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit{

  baseRoute='/employee-dash'
  constructor(private authService:AuthService){}
  ngOnInit(): void {
   this.setBaseUrl();
  }

  
setBaseUrl(){
  this.baseRoute = this.authService.getUrl();
}

}