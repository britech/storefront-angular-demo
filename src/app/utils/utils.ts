export class Utils {
    static round(value: number, precision: number = 2) : string {
        return value.toFixed(precision);
    }
}
