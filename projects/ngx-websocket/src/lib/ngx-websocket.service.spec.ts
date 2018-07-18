import { TestBed, inject } from '@angular/core/testing';

import { NgxWebsocketService } from './ngx-websocket.service';
import { Socket } from './socket';
import { socketConfig } from './socketConfig';

describe('NgxWebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxWebsocketService]
    });
  });

  it('should be created', inject([NgxWebsocketService], (service: NgxWebsocketService) => {
    expect(service).toBeTruthy();
    service.open("ws://echo.websocket.org").on("open", (data, socket) => {
      console.log("send message");
      socket.send("hello")
    }, () => {}).on("message", (data) => {
      console.log(data);
    }, "id");
  }));

});
