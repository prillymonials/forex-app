import { IHash } from './interfaces';

/**
 * Initial currency amount when first mounting the application.
 */
export const INITIAL_CURRENCY_AMOUNT: number = 1;

/**
 * Base currency.
 */
export const BASE_CURRENCY: string = 'USD';

/**
 * List of available currencies for trading.
 */
export const CURRENCY_LIST: string[]
    = ['CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'];

/**
 * Hash map of available currencies, it will get name of currency based on
 * currency code.
 */
export const HASH_MAP_CURRENCY_NAME: IHash<string> = {
    CAD: 'Canadian Dollars',
    CHF: 'Swiss Franc',
    GBP: 'British Pound',
    IDR: 'Indonesian Rupiah',
    INR: 'Indian Rupee',
    JPY: 'Japanese Yen',
    KRW: 'Korean Won',
    MYR: 'Malaysian Ringgit',
    SGD: 'Singapore Dollars',
    USD: 'United States Dollars',
};