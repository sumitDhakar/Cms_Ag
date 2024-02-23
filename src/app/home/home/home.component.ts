import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStatus } from 'src/app/entites/chat/user-status';
import { CanComponentDeactivate } from 'src/app/materials/guards/chat-deactive.guard';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, CanComponentDeactivate {

  ngOnInit(): void {
    this.webSocketService.connect();
    
    this.removeSidebarClass();
   
  }
  constructor(private webSocketService: WebSocketService, private authService: AuthService) { }
  canDeactivate() {
    // disconnecting the sock
    this.webSocketService.disConnect();
    return true;
  }




  doBeforeUnload() {
    let userId = this.authService.getUser().id;
    this.webSocketService.updateStatus(UserStatus.Offline, userId);
    return true;
  }
  

  removeSidebarClass(){
    let element = document.getElementById("sidebar");
    element?.classList.add('opened');
    console.log(element);
    
 }

}
