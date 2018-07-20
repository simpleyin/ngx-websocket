import { Component, OnInit } from '@angular/core';
import { NgxWebsocketService } from './ngx-websocket.service';
import { Socket } from './socket';

@Component({
  selector: 'enl-ngx-websocket',
  template: `
    <p>
      ngx-websocket works!
    </p>
    <div>
      <button (click)="send()">发送</button>
    </div>
  `,
  styles: []
})
export class NgxWebsocketComponent implements OnInit {
  socket: Socket;
  constructor(private websocketService: NgxWebsocketService,
    ) {
      
     }

  ngOnInit() {
    // this.websocketService.open("ws://www.simpleyin.xyz:8001").on("open", d => {
    //   console.log(d);
    // });
    this.socket = this.websocketService.open("ws://echo.websocket.org").then(d => console.log("websocket opend"))
        .message(d => d + " has reveived").then(d => console.log(d));
  }

  send(): void {
    this.socket.send("hi");
  }


}
