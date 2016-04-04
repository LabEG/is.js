is.ts
=====
This is fork of is.js converted to typescript

work on fork only begins...

####This is a general-purpose check library.
- No dependencies
- AMD, Node & browser ready

####Usage:

Node.js:
```
npm install is_ts
```

Build in bash:
```
./build.sh
```

Strong Type checks
===========

```typescript

// Type checks:
is.arguments(value: IArguments): boolean
is.array(value: Array<any>): boolean
is.boolean(value: boolean): boolean
is.date(value: Date): boolean
is.error(value: Error): boolean
is.function(value: Function): boolean
is.nan(value: any): boolean
is.null(value: any): boolean
is.number(value: number): boolean
is.object(value: Object): boolean
is.json(value: Object): boolean
is.regexp(value: RegExp): boolean
is.sameType(value1: any, value2: any): boolean
is.string(value: string): boolean
is.char(value: string): boolean
is.undefined(value: any): boolean

// Presence checks:
is.empty(value: any): boolean
is.existy(value: any): boolean
is.truthy(value: any): boolean
is.falsy(value: any): boolean
is.space(value: string): boolean

// Arithmetic checks:
is.equal(value1, value2): boolean
is.even(numb: number): boolean
is.odd(numb: number): boolean
is.positive(numb: number): boolean
is.negative(numb: number): boolean
is.above(numb: number, min: number): boolean
is.under(numb: number, max: number): boolean
is.within(numb: number, min: number, max: number): boolean
is.decimal(numb: number): boolean
is.integer(numb: number): boolean
is.finite(numb: number): boolean
is.infinite(numb: number): boolean

// Regexp checks:
is.url(value: string): boolean
is.email(value: string): boolean
is.creditCard(value: string): boolean
is.alphaNumeric(value: string): boolean
is.timeString(value: string): boolean
is.dateString(value: string): boolean
is.usZipCode(value: string): boolean
is.caPostalCode(value: string): boolean
is.ukPostCode(value: string): boolean
is.nanpPhone(value: string): boolean
is.eppPhone(value: string): boolean
is.socialSecurityNumber(value: string): boolean
is.affirmative(value: string): boolean
is.hexadecimal(value: string): boolean
is.hexColor(value: string): boolean
is.ipv4(value: string): boolean
is.ipv6(value: string): boolean
is.ip(value: string): boolean

// String checks:
is.include(str: string, substr: string): boolean
is.upperCase(str: string): boolean
is.lowerCase(str: string): boolean
is.startWith(str: string, startWith: string): boolean
is.endWith(str: string, endWith: string): boolean
is.capitalized(str: string): boolean
is.palindrome(str: string): boolean

// Time checks:
is.today(obj: Date): boolean
is.yesterday(obj: Date): boolean
is.tomorrow(obj: Date): boolean
is.past(obj: Date): boolean
is.future(obj: Date): boolean
is.day(obj: Date, dayString): boolean
is.month(obj: Date, monthString): boolean
is.year(obj: Date, year: number): boolean
is.leapYear(year: number): boolean
is.weekend(obj: Date): boolean
is.weekday(obj: Date): boolean
is.inDateRange(obj: Date, startObj: Date, endObj: Date): boolean
is.inLastWeek(obj: Date): boolean
is.inLastMonth(obj: Date): boolean
is.inLastYear(obj: Date): boolean
is.inNextWeek(obj: Date): boolean
is.inNextMonth(obj: Date): boolean
is.inNextYear(obj: Date): boolean
is.quarterOfYear(obj: Date, quarterNumber: number): boolean
is.publicdayLightSavingTime(obj: Date): boolean

// Environment checks
is.chrome(): boolean
is.firefox(): boolean
is.edge(): boolean
is.ie(version?: number): boolean
is.opera(): boolean
is.safari(): boolean
is.ios(): boolean
is.iphone(): boolean
is.ipad(): boolean
is.ipod(): boolean
is.android(): boolean
is.androidPhone(): boolean
is.androidTablet(): boolean
is.blackberry(): boolean
is.desktop(): boolean
is.linux(): boolean
is.mac(): boolean
is.windows(): boolean
is.windowsPhone(): boolean
is.windowsTablet(): boolean
is.mobile(): boolean
is.tablet(): boolean
is.online(): boolean
is.offline(): boolean
is.touchDevice(): boolean

// Object checks
is.propertyCount(obj: Object, count: number): boolean
is.propertyDefined(obj: Object, property: string): boolean
is.windowObject(obj: Object): boolean
is.domNode(obj: HTMLElement): boolean

// Array checks
is.inArray<T>(val: T, arr: Array<T>): boolean
is.sorted(arr: Array<any>): boolean
is.setRegexp(regexp: RegExp, regexpName: string): void

```
