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
    ) {}

    open: void {
        this.socketSer.open("ws://echo.websocket.org", d => {
            console.log(d.event);
        }).on("message", d => {
            console.log(d.event.data);
        })
    }
}
```