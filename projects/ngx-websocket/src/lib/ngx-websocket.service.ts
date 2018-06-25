import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Socket } from './socket';

/**
 * this service provides multiple methods to create websocket, add callback function to websocekt or destory webscoket.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxWebsocketService {
  //save all the socket opened by this service
  private sockets: Map<string, Socket>;
  
  constructor() {
    this.sockets = new Map<string, Socket>();
  }

  public open(url): Socket {
    if (!this.checkExistence(url)) {
      let socket = new Socket(url);
      this.sockets.set(url, socket);
      return socket;
    }
  }

  private checkExistence(url) {
    this.sockets.forEach((key, value) => {
      if (key === url) {
        //check connection state
        console.warn("a websocket with same url has existed");
        return true;
      }
    })
    return false;
  }
}
