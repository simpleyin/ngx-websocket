import { Observable } from "rxjs";

/**
 * Socket class
 * each socket handles a single WebScoket Connection.
 */
export class Socket {
    private websocket: WebSocket;
    private _openObservable: Observable<any>;
    private _errorObservable: Observable<any>;
    private _messageObservable: Observable<any>;
    private _closeObservable: Observable<any>;
    private state: string;

    constructor(private url: string) {
        this.websocket = new WebSocket(url);
        this.state = "closed";
        //onOpen
        this._openObservable = new Observable((observer) => {
            this.websocket.addEventListener("open", (e) => {
                this.state = "opened";
                observer.next({
                    event: e,
                    websocket: this.websocket
                });
            });
        });
        //onError
        this._errorObservable = new Observable((observer) => {
            this.websocket.addEventListener("error", (e) => {
                console.error("websocket on error");
                observer.next({
                    event: e,
                    websocket: this.websocket
                });
            })
        });
        //onMessage
        this._messageObservable = new Observable((observer) => {
            this.websocket.addEventListener("message", (e) => {
                observer.next({
                    event: e,
                    websocket: this.websocket
                });
            });
        });
        //onClose
        this._closeObservable = new Observable((observer) => {
            this.websocket.addEventListener("close", (e) => {
                this.state = "closed";
                console.warn("websocekt closed");
                observer.next({
                    event: e,
                    websocket: this.websocket
                });
            })
        });
    }

    /**
     * 
     * @param action action type, like "open", "error", "message", "close"
     * @param callback the callback funtion of triggered action
     */
    public on(action: string, callback: Function): Socket {
        if (action === "open") {
            this._openObservable.subscribe({
                next(d) {
                    callback(d);
                },
                error(msg) {
                    console.error(msg);
                }
            })
        }
        if (action === "error") {
            this._errorObservable.subscribe({
                next(d) {
                    callback(d);
                },
                error(msg) {
                    console.error(msg);
                }
            });
        }
        if (action === "message") {
            this._messageObservable.subscribe({
                next(d) {
                    callback(d);
                },
                error(msg) {
                    console.error(msg);
                }
            });
        }
        if (action === "close") {
            this._closeObservable.subscribe({
                next(d) {
                    callback(d);
                },
                error(msg) {
                    console.error(msg);
                }
            });
        }

        return this;
    }

    /**
     * send message via this websocket
     * @param message 
     */
    public send(message: string) {
        try {
            this.websocket.send(message);
        } catch (e) {
            console.error(e);
        }
    }


}