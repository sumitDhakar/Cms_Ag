import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/entites/permissions';
import { Users } from 'src/app/entites/users';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { SidenavComponent } from '../../sideNav/sidenav/sidenav.component';
import { ConversationUser } from 'src/app/entites/chat/conversation-user';
import { WebsocketService } from 'src/app/services/websocket-service.service';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';
import { MessageMapping } from 'src/app/materials/custome-routing/message-mapping';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [SidenavComponent]
})
export class NavComponent implements OnInit {

 notification:ConversationUser = new  ConversationUser();

  constructor(private authService: AuthService, private router: Router
    , private location: Location, private sidenavComponent: SidenavComponent,private webSocketService:WebSocketService) { }
  ngOnInit(): void {
    
    this.user = this.authService.getUser();
    this.setPermissions();
    this.setBaseUrl();
    this.getCurrentLoggedInUser();
    this.getCurrentUser();
    // this.recievedMessage()
  }
  // recievedMessage() {
  // this.notification  = this.webSocketService.subscribeMessgae(MessageMapping.RECIEVE_MESSAGE+)
  // }

  baseRoute = 'employee-dash'

  getCurrentUser(){
    this.authService.getCurrentUser().subscribe((data:any)=>{
      this.authService.setUser(data);
      //  this.routeUtils.openUserDashboard();
       this.authService.user.next(data);
      // console.log(this.router.config);
    },(err)=>{
      if(err.status==401){
        localStorage.clear();
        this.router.navigate(['login']);
      }
    })
  }
  


  public getCurrentLoggedInUser(){
    this.authService.loggedInUser.subscribe({
      next:(data:any)=>{
        this.user = data;
      }
    })
  }

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }


  toggleSideNav(temp: any) {
    if (temp.style.display === 'none')
      temp.style.display = 'block';
    else
      temp.style.display = 'none';

  }

  permissions: Permissions = new Permissions();
  setPermissions() {
    this.authService.isUserPermitted(this.location.path(), false).then(data => {
      if (data == null)
        this.authService.navigate(this.baseRoute);
      this.permissions = data;
    })
  }
  imageUrl = environment.hostUrl + '/auth/file/getImageApi/UserProfile/';

  user!: Users;
  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  public toggleSetting() {
    this.sidenavComponent.toggleSetting()
  }
}
