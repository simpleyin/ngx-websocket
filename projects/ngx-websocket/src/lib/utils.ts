export class Utils {

    /**
     * return a given function's arguments array;
     * @param f 
     */
    public static getArguments(f: Function) {
        var _f = f();
        f.arguments
    }

    public static supportWebsocket(): boolean {
        if (WebSocket === null || WebSocket === undefined) return false;
        else return true;
    }
}