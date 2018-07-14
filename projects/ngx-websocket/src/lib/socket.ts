import { Observable, Subscription } from "rxjs";
/**
 * Socket class
 * each socket handles a single WebScoket Connection.
 */
export class Socket {
    private websocket: WebSocket;
    private _state: string;
    private _openObservable: Observable<any>;
    private _errorObservable: Observable<any>;
    private _messageObservable: Observable<any>;
    private _closeObservable: Observable<any>;
    private _openSubscriptions: Map<number | string, Subscription>;
    private _errorSubscriptions: Map<number | string, Subscription>;
    private _messageSubscriptions: Map<number | string, Subscription>;
    private _closeSubscriptions: Map<number | string, Subscription>;

    constructor(private url: string) {
        this.websocket = new WebSocket(url);
        this._state = "closed";
        this._openSubscriptions = new Map();
        this._errorSubscriptions = new Map();
        this._messageSubscriptions = new Map();
        this._closeSubscriptions = new Map();
        //onOpen
        //there is no difference between new Observable and Observable.create()
        this._openObservable = Observable.create((observer) => {
            this.websocket.addEventListener("open", (e) => {
                this._state = "opened";
                observer.next({
                    event: e
                });
            });
        });

        //onError
        this._errorObservable = Observable.create((observer) => {
            this.websocket.addEventListener("error", (e) => {
                console.error("websocket on error");
                observer.next({
                    event: e
                });
            })
        });
        //onMessage
        this._messageObservable = Observable.create((observer) => {
            this.websocket.addEventListener("message", (e) => {
                observer.next({
                    event: e
                });
            });
        });
        //onClose
        this._closeObservable = Observable.create((observer) => {
            this.websocket.addEventListener("close", (e) => {
                this._state = "closed";
                console.warn("websocket closed");
                observer.next({
                    event: e
                });
            })
        });
    }

    /**
     * 
     * @param action action type, "open", "error", "message", "close"
     * @param callback the callback funtion of triggered action
     * @param config? 
     */
    public on(action: string, callback: (data: any, socket?: Socket, event?: Event) => any, _id?: number | string,): Socket {
        //反射得到callback中的id
        var id: number | string;
        var socket = this;
        if (_id === undefined || null) {
            id = (new Date().valueOf()) * 10000 + Math.round(Math.random() * 1000);    //timestamp as default id;
        }
        else {
            id = _id;
        }
        console.log("id: " + id);
        
        if (action === "open") {
            this._openSubscriptions.set(id, this._openObservable.subscribe({
                next(d) {
                    callback((d.event.data), socket, d.event);
                },
                error(msg) {
                    console.error(msg);
                }
            }));
        }
        if (action === "error") {
            this._errorSubscriptions.set(id, this._errorObservable.subscribe({
                next(d) {
                    callback((d.event.data), socket, d.event);
                },
                error(msg) {
                    console.error(msg);
                }
            }));
        }
        if (action === "message") {
            this._messageSubscriptions.set(id, this._messageObservable.subscribe({
                next(d) {
                    callback((d.event.data), socket, d.event);
                },
                error(msg) {
                    console.error(msg);
                }
            }));
        }
        if (action === "close") {
            this._closeSubscriptions.set(id, this._closeObservable.subscribe({
                next(d) {
                    callback((d.event.data), socket, d.event);
                },
                error(msg) {
                    console.error(msg);
                }
            }));
        }

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

    public get state() {
        return this._state;
    }

    /**
     * clean all onMessage subscriber.
     */
    public cleanAllMessageListener(): Socket {
        this._messageSubscriptions.forEach(s => {
            s.unsubscribe();
        })
        return this;
    }
    
    /**
     * cancle onMessage listener by id
     * @param id 
     */
    public clean(id: number | string): void {
        try {
            //remove or unsubscribe?
            this._messageSubscriptions.get(id).unsubscribe();
        }
        catch(e) {
            throw "clean event listener error";
        }
        
    }


}