import { Component, OnInit } from '@angular/core';
import { NgxWebsocketService, Socket } from "ngx-websocket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  socket: Socket;
  constructor(private websocketService: NgxWebsocketService,
    ) {
      
     }

  ngOnInit() {
    // this.websocketService.open("ws://www.simpleyin.xyz:8001").on("open", d => {
    //   console.log(d);
    // });
  this.socket = this.websocketService.open("ws://echo.websocket.org").then(d => console.log("websocket opend"))
        .message(d => d + " has reveived").then(d => console.log(d)).message(d => console.log("send to A")).message(d => console.log("send to B"));
  }

  send(): void {
    this.socket.send("hi");
  }

  addHandler(): void {
    console.log("add");
    this.socket.message(d => console.log("send to c"));
  }
}
