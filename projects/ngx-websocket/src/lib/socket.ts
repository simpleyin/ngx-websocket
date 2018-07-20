import { Observable, Subscription } from "rxjs";
import { Utils } from "./utils";
import { Subscribe } from "./subscribe";
/**
 * Socket class
 * each socket handles a single WebScoket Connection.
 */
export class Socket {
    private websocket: WebSocket;
    private _state: string;
    private _passingData: any;
    private _openObservable: Observable<any>;
    private _errorObservable: Observable<any>;
    private _messageObservable: Observable<any>;
    private _closeObservable: Observable<any>;
    private _subscribes: Subscribe[];

    constructor(private url: string) {
        try {
            this.websocket = new WebSocket(url);
        } catch(e) {
             console.error(e);
        }
        this._state = "closed";
        this._subscribes = [];
        //onOpen
        this.websocket.addEventListener("open", (e) => {
            //websocket stream start
            this.subscribeLoop(true);
        })

        //onError
        this.websocket.addEventListener("error", (e) => {
            console.error("websocket onError");
        })

        //onMessage
        this._messageObservable = Observable.create((observer) => {
            this.websocket.addEventListener("message", (e) => {
                observer.next({
                    event: e
                });
                //stream start again
                this.subscribeLoop(false);
            });
        });

        //onClose
        this.websocket.addEventListener("close", (e) => {
            this._state = "closed";
            console.warn("websocket onClose");
        });
    }

    /**
     * reveive data from previous handler, wouldn't block current stream.
     * @param f 
     */
    public then(f: (d: any, socket?: Socket) => any): Socket {
        this._subscribes.push(new Subscribe(0, f));
        return this;
    }

    /**
     * callback funtion when websocket reveive message. 
     * @param f 
     */
    public message(f: (text: any, d?: any, socket?: Socket, event?: Event) => any): Socket {
        this._subscribes.push(new Subscribe(1, f));
        return this;
    }

    /**
     * catch error or close state on websocket;
     */
    public catch(): Socket {
        return this;
    }

    /**
     * finally handler.
     */
    public finally(): Socket {
        return this;
    }

    /**
     * send message via this websocket
     * @param message 
     */
    public send(message: string): Socket {
        try {
            this.websocket.send(message);
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    /**
     * close websocket
     */
    public close(): void {
        this.websocket.close();
    }

    /**
     * traversal subscirbes set, execute action according to item's type
     * @param init if subscribeLoop is the first tiem to execute, than every 'then' handler before the first message handler will be remove after execute.
     */
    public subscribeLoop(init: boolean): void {
        let socket = this;
        for (let i = 0, len = this._subscribes.length; i < len; i++) {
            let sub = init ? this._subscribes.shift() : this._subscribes[i];
            
            if (sub.type === 0) {
                this._passingData = sub.f(this._passingData, socket);
                this._passingData = this._passingData;
            }
            if (sub.type === 1) {
                this._messageObservable.subscribe({
                    next(d) {
                        socket._passingData = sub.f((d.event.data), socket._passingData, socket, d.event);
                    },
                    error(msg) {
                        //call the catch handler
                    }
                });
                break; //the message handler will block the stream;
            }
        }
    }

    //get state property
    public get state() {
        return this._state;
    }



}