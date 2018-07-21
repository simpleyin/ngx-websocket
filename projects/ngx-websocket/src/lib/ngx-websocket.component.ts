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
      <button>发送</button>
    </div>
  `,
  styles: []
})
export class NgxWebsocketComponent {
  socket: Socket;
  constructor(private websocketService: NgxWebsocketService,
    ) {
      
     }
}
