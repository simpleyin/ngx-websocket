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
    
  }));

});
