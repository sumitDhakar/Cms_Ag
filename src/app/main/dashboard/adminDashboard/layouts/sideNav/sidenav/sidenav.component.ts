import { Component, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/entites/users';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  ngAfterViewInit() {
    // You can access and manipulate this.submenu here after the view has been initialized.
  }

  baseRoute = 'employee-dash'

  isAdmin = false;
  permission!: Map<String, Boolean>;
  ngOnInit(): void {
    this.validations()
    this.setBaseUrl();
    this.getCurrentLoggedInUser();

  }

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }


  validations() {
    this.authService.getSideNavPermission().subscribe((data: any) => {
      // this.permission = data.permission;
      //  alert(this.permission.get("Employee/leave_settings"));
      this.permission = new Map(Object.entries(data.permission));

      console.log(this.permission);
    })
  }

  getValueByKey(key: string) {
    screen
    if (this.permission)
      return this.permission.get(key);
    else
      return true;
  }

  toggleSideNav(temp: any) {
    if (temp.style.display === 'none')
      temp.style.display = 'block';
    else
      temp.style.display = 'none';
  }

  public toggleSetting() {
    let temp = document.getElementById('t11')
    if (temp!.style.display === 'none') {
      temp!.style.display = 'block';
      this.openSetting();
    } else
      temp!.style.display = 'none';
  }

  public openSetting() {
    let ele = document.getElementById('setting');
    ele?.scrollIntoView();
  }


  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  user=new Users();
  public getCurrentLoggedInUser(){
    this.authService.loggedInUser.subscribe({
      next:(data:any)=>{
        this.user = data;
      }
    })
  }

}
