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
    var index = 0;
    service.open("ws://echo.websocket.org").on("open", (data, socket, event) => {
      socket.send("hello");
    }).on("message", (data, socket, event) => {
      console.log("first");
    }, 'first').on("message", (data, socket, event) => {
      console.log("second");
    }, 'second').on("message", (data, socket, event) => {
      console.log(event);
      if (index > 10) socket.cleanAllMessageListener();
    });
  }));

  it('should be created', inject([NgxWebsocketService], (service: NgxWebsocketService) => {
    expect(service).toBeTruthy();
    service.open("ws://echo.websocket.org").on("open", () => {

    });
  }));

});
