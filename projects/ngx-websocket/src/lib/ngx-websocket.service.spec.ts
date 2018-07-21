import { TestBed, inject } from '@angular/core/testing';

import { NgxWebsocketService } from './ngx-websocket.service';

describe('NgxWebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxWebsocketService]
    });
  });

  it('should be created', inject([NgxWebsocketService], (service: NgxWebsocketService) => {
    expect(service).toBeTruthy();
    var socket = service.open("ws://echo.websocket.org")
      .then(d => console.log("websocket opend"))
        .then((d, s) => setTimeout(() => s.send("hi"), 1000))
          .message(d => "receive" + d)
            .then(d => console.log(d))
              .message(d => console.log("send to A"))
                .message(d => console.log("send to B"));

    socket.message(d => console.log("send to c"));
  }));

});
