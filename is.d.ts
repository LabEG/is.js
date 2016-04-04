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
    array(value: Array<any>): boolean;
    boolean(value: boolean): boolean;
    date(value: Date): boolean;
    error(value: Error): boolean;
    function(value: Function): boolean;
    nan(value: any): boolean;
    null(value: any): boolean;
    number(value: number): boolean;
    object(value: Object): boolean;
    json(value: Object): boolean;
    regexp(value: RegExp): boolean;
    sameType(value1: any, value2: any): boolean;
    string(value: string): boolean;
    char(value: string): boolean;
    undefined(value: any): boolean;
    empty(value: any): boolean;
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
    setRegexp(regexp: RegExp, regexpName: string): void;
}
export declare const is: Is;
