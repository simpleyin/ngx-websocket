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
    service.open("ws://echo.websocket.org").on("open", (d) => {
      console.log("websocket open");
      console.log(d);
      d.websocket.send("111");
    }).on("message", d => {
      console.log(d.event.data);
    }).on("message", d => {
      console.log("2222");
    });
  }));
});
