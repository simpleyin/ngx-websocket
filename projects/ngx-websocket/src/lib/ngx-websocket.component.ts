import { Component, OnInit } from '@angular/core';
import { NgxWebsocketService } from './ngx-websocket.service';

@Component({
  selector: 'enl-ngx-websocket',
  template: `
    <p>
      ngx-websocket works!
    </p>
  `,
  styles: []
})
export class NgxWebsocketComponent implements OnInit {

  constructor(private websocketService: NgxWebsocketService) { }

  ngOnInit() {
    // this.websocketService.open("ws://www.simpleyin.xyz:8001").on("open", d => {
    //   console.log(d);
    // });
  }


}
