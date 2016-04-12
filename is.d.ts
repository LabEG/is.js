/**
 * is.ts 0.8.8
 * Author: Aras Atasaygin https://github.com/arasatasaygin/is.js
 * Author of fork: Evgeny Labutin https://github.com/LabEG/is.js
 *
 * PS: The library is strive to be light and fast. So she uses the latest standart ES5.
 * But old browsers don't support the ES5 standard. And therefore, such functions as is.array,
 * is.every and others will not work in old browsers. If you need enable support for old browsers
 * you need enable polyfills in your project. This is the most rational way of using resources, speed and memory.
 *
 */
/**
 * @description
 * Light library for chek types in runtime
 *
 * @export
 * @class Is
 */
export declare class Is {
    VERSION: string;
    days: string[];
    months: string[];
    userAgent: string;
    vendor: string;
    appVersion: string;
    regexps: {
        url: RegExp;
        email: RegExp;
        creditCard: RegExp;
        alphaNumeric: RegExp;
        timeString: RegExp;
        dateString: RegExp;
        usZipCode: RegExp;
        caPostalCode: RegExp;
        ukPostCode: RegExp;
        nanpPhone: RegExp;
        eppPhone: RegExp;
        socialSecurityNumber: RegExp;
        affirmative: RegExp;
        hexadecimal: RegExp;
        hexColor: RegExp;
        ipv4: RegExp;
        ipv6: RegExp;
        ip: RegExp;
        [key: string]: RegExp;
    };
    arguments(value: IArguments): boolean;
    /**
     * @description Is a given value Array?
     *
     * Valid:
     * [], [1, "test", null, void 0]
     *
     * Invalid:
     * "test", 5, null, void 0, {test: 5}
     *
     *
     * @param {Array<any>} value Value for check
     * @returns {boolean} Result of check
     */
    array(value: Array<any>): boolean;
    /**
     * @description Is a given value Array or Null?
     *
     * Valid:
     * [], null, [1, "test", null, void 0]
     *
     * Invalid:
     * "test", 5, , void 0, {test: 5}
     *
     *
     * @param {Array<any>} value Value for check
     * @returns {boolean} Result of check
     */
    arrayOrNull(value: Array<any>): boolean;
    /**
     * @description Is a given value Boolean?
     *
     * Valid:
     * true, false, Boolean(5), new Boolean("123")
     *
     * Invalid:
     * "test", 5, null, void 0, {test: 5}
     *
     * @param {(boolean | Boolean)} value Value for check
     * @returns {boolean} Result of check
     */
    boolean(value: boolean | Boolean): boolean;
    /**
     * @description Is a given value Boolean or Null?
     *
     * Valid:
     * true, false, null, Boolean(5), new Boolean("123")
     *
     * Invalid:
     * "test", 5, void 0, {test: 5}
     *
     * @param {(boolean | Boolean)} value Value for check
     * @returns {boolean} Result of check
     */
    booleanOrNull(value: boolean | Boolean): boolean;
    /**
     * @description Is a given value Date Object?
     *
     * Valid:
     * new Date()
     *
     * Invalid:
     * "test", 5, null, void 0, {test: 5}
     *
     * @param {Date} value Value for check
     * @returns {boolean} Result of check
     */
    date(value: Date): boolean;
    /**
     * @description Is a given value Date Object or Null?
     *
     * Valid:
     * new Date(), null
     *
     * Invalid:
     * "test", 5, void 0, {test: 5}
     *
     * @param {Date} value Value for check
     * @returns {boolean} Result of check
     */
    dateOrNull(value: Date): boolean;
    error(value: Error): boolean;
    errorOrNull(value: Error): boolean;
    function(value: Function): boolean;
    functionOrNull(value: Function): boolean;
    nan(value: any): boolean;
    nanOrNull(value: any): boolean;
    /**
     * @description Is a given value null?
     *
     * Valid:
     * null
     *
     * Invalid:
     * "test", 5, {test}
     *
     *
     * @param {*} value Value for check
     * @returns {boolean} Result of check
     */
    null(value: any): boolean;
    /**
     * @description Is a given value number?
     *
     * Valid:
     * 5, 0.1, Number(5), new Number(5)
     *
     * Invalid:
     * "5", null
     *
     *
     * @param {number | Number} value Value for check
     * @returns {boolean} Result of check
     */
    number(value: number | Number): boolean;
    /**
     * @description Is a given value number or null?
     *
     * Valid:
     * 5, null, 0.1, Number(5), new Number(5)
     *
     * Invalid:
     * "5"
     *
     *
     * @param {number | Number} value Value for check
     * @returns {boolean} Result of check
     */
    numberOrNull(value: number | Number): boolean;
    object(value: Object): boolean;
    objectOrNull(value: Object): boolean;
    json(value: Object): boolean;
    jsonOrNull(value: Object): boolean;
    regexp(value: RegExp): boolean;
    regexpOrNull(value: RegExp): boolean;
    sameType(value1: any, value2: any): boolean;
    /**
     * @description Is a given value String?
     *
     * Valid:
     * "text", "123", String("text"), new String("text")
     *
     * Invalid:
     * 5, null, void 0
     *
     *
     * @param {string | String} value Value for check
     * @returns {boolean} Result of check
     */
    string(value: string | String): boolean;
    /**
     * @description Is a given value String or Null?
     *
     * Valid:
     * "text", null, "123", String("text"), new String("text")
     *
     * Invalid:
     * 5, void 0
     *
     *
     * @param {string | String} value Value for check
     * @returns {boolean} Result of check
     */
    stringOrNull(value: string | String): boolean;
    char(value: string): boolean;
    charOrNull(value: string): boolean;
    empty(value: any): boolean;
    defined(value: any): boolean;
    undefined(value: any): boolean;
    existy(value: any): boolean;
    truthy(value: any): boolean;
    falsy(value: any): boolean;
    space(value: string): boolean;
    equal(value1: any, value2: any): boolean;
    even(numb: number): boolean;
    odd(numb: number): boolean;
    positive(numb: number): boolean;
    negative(numb: number): boolean;
    above(numb: number, min: number): boolean;
    under(numb: number, max: number): boolean;
    within(numb: number, min: number, max: number): boolean;
    decimal(numb: number): boolean;
    integer(numb: number): boolean;
    finite(numb: number): boolean;
    infinite(numb: number): boolean;
    url(value: string): boolean;
    email(value: string): boolean;
    creditCard(value: string): boolean;
    alphaNumeric(value: string): boolean;
    timeString(value: string): boolean;
    dateString(value: string): boolean;
    usZipCode(value: string): boolean;
    caPostalCode(value: string): boolean;
    ukPostCode(value: string): boolean;
    nanpPhone(value: string): boolean;
    eppPhone(value: string): boolean;
    socialSecurityNumber(value: string): boolean;
    affirmative(value: string): boolean;
    hexadecimal(value: string): boolean;
    hexColor(value: string): boolean;
    ipv4(value: string): boolean;
    ipv6(value: string): boolean;
    ip(value: string): boolean;
    include(str: string, substr: string): boolean;
    upperCase(str: string): boolean;
    lowerCase(str: string): boolean;
    startWith(str: string, startWith: string): boolean;
    endWith(str: string, endWith: string): boolean;
    capitalized(str: string): boolean;
    palindrome(str: string): boolean;
    today(obj: Date): boolean;
    yesterday(obj: Date): boolean;
    tomorrow(obj: Date): boolean;
    past(obj: Date): boolean;
    future(obj: Date): boolean;
    day(obj: Date, dayString: any): boolean;
    month(obj: Date, monthString: any): boolean;
    year(obj: Date, year: number): boolean;
    leapYear(year: number): boolean;
    weekend(obj: Date): boolean;
    weekday(obj: Date): boolean;
    inDateRange(obj: Date, startObj: Date, endObj: Date): boolean;
    inLastWeek(obj: Date): boolean;
    inLastMonth(obj: Date): boolean;
    inLastYear(obj: Date): boolean;
    inNextWeek(obj: Date): boolean;
    inNextMonth(obj: Date): boolean;
    inNextYear(obj: Date): boolean;
    quarterOfYear(obj: Date, quarterNumber: number): boolean;
    publicdayLightSavingTime(obj: Date): boolean;
    chrome(): boolean;
    firefox(): boolean;
    edge(): boolean;
    ie(version?: number): boolean;
    opera(): boolean;
    safari(): boolean;
    ios(): boolean;
    iphone(): boolean;
    ipad(): boolean;
    ipod(): boolean;
    android(): boolean;
    androidPhone(): boolean;
    androidTablet(): boolean;
    blackberry(): boolean;
    desktop(): boolean;
    linux(): boolean;
    mac(): boolean;
    windows(): boolean;
    windowsPhone(): boolean;
    windowsTablet(): boolean;
    mobile(): boolean;
    tablet(): boolean;
    online(): boolean;
    offline(): boolean;
    touchDevice(): boolean;
    propertyCount(obj: Object, count: number): boolean;
    propertyDefined(obj: Object, property: string): boolean;
    windowObject(obj: Object): boolean;
    domNode(obj: HTMLElement): boolean;
    inArray<T>(val: T, arr: Array<T>): boolean;
    sorted(arr: Array<any>): boolean;
    /**
     * @description Is all elements of array from type?
     *
     * @template T
     * @param {T[]} value Array for checking
     * @param {(value: T) => boolean} callback Element type cheking function
     * @returns {boolean} Result of check
     */
    every<T>(value: T[], callback: (value: T) => boolean): boolean;
    setRegexp(regexp: RegExp, regexpName: string): void;
}
export declare const is: Is;
