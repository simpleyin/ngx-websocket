export class Subscribe {
    public type: number; //then: 0, message: 1, catch: 2, finally: 3.
    public f: Function;
    constructor(_type: number, _f: Function) {
        this.type = _type;
        this.f = _f;
    }
}