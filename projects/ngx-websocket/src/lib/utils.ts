export class Utils {

    /**
     * return a given function's arguments array;
     * @param f 
     */
    public static getArguments(f: Function) {
        var _f = f();
        f.arguments
    }
}