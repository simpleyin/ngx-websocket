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

    var ws = service.open("ws://echo.websocket.org").then((d, socket) => socket.send("hi")).message(d => d + " siri").then(d => console.log(d)).then((d, socket) => socket.close()).then((d, socekt) => socekt.send("hi"));
        
  }));

});
