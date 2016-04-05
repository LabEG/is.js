is.ts
=====
This is fork of is.js converted to typescript.

All 'not', 'all', 'any' fuction is deprecated. If you needed them, please write issue and i restore their.

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

For What?
===========
Is.js it guarantees that the object will be correctly deserialized and your application logic will not break in a random position due to error in the object

Example:
```typescript

import {is} from "is_ts";

class User {

    public name: string;
    public age: number;
    public weight: number;

    public sex: number;

    public identifier: string;

    constructor(name?: string, age?: number, weight?: number) {

        this.name = is.string(name) ? name : "Empty Name";
        this.age = is.number(age) ? age : 0;
        this.weight = is.number(weight) ? weight : 0;

        this.sex = null;
        this.identifier = null;

    }

    // `object` is not deserialized now, and can by any objects,
    // we only expect it needs to be User
    public deserialize(object: User): User {

        // not important logic we can replace by default value, and hide error from users
        this.name = is.string(object.name) ? object.name : this.name;
        this.age = is.number(object.age) ? object.age : this.age;
        this.weight = is.number(object.weight) ? object.weight : this.weight;

        // nullable types must by checked individualy
        this.weight = is.number(object.sex) || is.null(object.sex) ? object.sex : this.sex;

        // on important logic we must drop exception and prevent work of programm
        this.identifier = is.string(object.identifier) ? object.identifier :
            dropException("User.deserialize: error on deserializaion, propertie identifier is not a String");

        return this;

    }

    public goForward(): this {
        // logic
        return this;
    }

    public goBackward(): this {
        // logic
        return this;
    }

}

window.fetch("./user")
    .then((response: Response) => response.json())

    // you are think that is must by User, but this is maybe and wrong object,
    // example after change API on backend 
    .then((objects: User) => {
        // objects.goForward() -- if call any method of User will by error: method not found,
        // for calls method object must by correct deserialized
        return new User().deserialize(objects);
    })
    .then(() => //app logic)
    .catch((error: Error) => console.log("Error on user request: ", error));

function dropException(text: string): any {
    'use strict';
    throw new Error(text);
}

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
