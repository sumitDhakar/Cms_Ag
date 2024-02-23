import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/materials/guards/chat-deactive.guard';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit, CanComponentDeactivate {
  ngOnInit(): void {
    this.webSocketService.connect();
  }
  constructor(private webSocketService: WebSocketService) { }
  canDeactivate() {
    // disconnecting the socket
    this.webSocketService.disConnect();
    return true;
  }

}

