# Ngx-Websocket
> a simple websocket connection manager for angular4+

## How To Install
```shell
npm install ngx-websocket --save
```
***

## How To Use
1. import NgxWebSocketModule
```typescript
import { NgxWebSocketModule } from "ngx-websocket";
```

2. build connection
```typescript
//test-component.ts
import { Socket, NgxWebsocketService } from "ngx-websocket";

export class TestComponent {
    constructor(
        private socketSer: NgxWebsocektService;
        private socket: Socket
    ) {}

    open(): void {
        this.socket = this.socketSer.open("ws://echo.websocket.org").on("open", (data, socket, event) => {
            socket.send("message");
        }).on("message", (data) => {
            sonsole.log(data);
        }, 'id').on("error", (data, socket) => {
            console.error("error");
            socket.clean('id'); //remove onmessage listener by id.
        }).on("close", (data) => {
            console.warn("closed");
        })
    }

    send(): void {
        this.socket.send("message");
    }
}
```

***
## TODO
1. reconnect automatically
2. ability to remove callback function  (done)
3. add execute level for each backfunction