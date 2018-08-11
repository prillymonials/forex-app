/**
 * This interface for helper accessing object like an array.
 * Eg:
 * ```
 * const obj: IHash<string> = { a: 'b', c: 'd', e: 'f' };
 * console.log(obj['a']);
 * ```
 * 
 * @export
 * @interface IHash
 * @template V
 */
export interface IHash<V = any> {
    [key: string]: V;
}

/**
 * This is response properties after fetching
 * `https://exchangeratesapi.io/api/latest?base=USD`.
 *
 * @export
 * @interface IApiResponse
 */
export interface IApiResponse {
    base: string;
    date: string;
    rates: IHash<number>;
}