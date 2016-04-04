// is.js 0.8.0
// Author: Aras Atasaygin https://github.com/arasatasaygin/is.js
// Author of fork: Evgeny Labutin https://github.com/LabEG/is.js

// Baseline
/* -------------------------------------------------------------------------- */

export class Is {

    public VERSION: string = "0.8.0";

    public days: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    public months: string[] = [
        "january", "february", "march",
        "april", "may", "june",
        "july", "august", "september",
        "october", "november", "december"
    ];

    // store navigator properties to use later
    public userAgent: string = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || "";
    public vendor: string = "navigator" in window && "vendor" in navigator && navigator.vendor.toLowerCase() || "";
    public appVersion: string = "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "";

    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // dateString match m/d/yy and mm/dd/yyyy,
    // allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // time match hours, minutes, and seconds, 24-hour clock
    public regexps: {
        url: RegExp,
        email: RegExp,
        creditCard: RegExp,
        alphaNumeric: RegExp,
        timeString: RegExp,
        dateString: RegExp,
        usZipCode: RegExp,
        caPostalCode: RegExp,
        ukPostCode: RegExp,
        nanpPhone: RegExp,
        eppPhone: RegExp,
        socialSecurityNumber: RegExp,
        affirmative: RegExp,
        hexadecimal: RegExp,
        hexColor: RegExp,
        ipv4: RegExp,
        ipv6: RegExp,
        ip: RegExp,
        [key: string]: RegExp
    } = {
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        hexadecimal: /^[0-9a-fA-F]+$/,
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
    };

    // Type checks
    /* -------------------------------------------------------------------------- */

    // is a given value Arguments?
    public arguments(value: IArguments): boolean {    // fallback check is for IE
        return !this.null(value) && (toString.call(value) === "[object Arguments]" || (typeof value === "object" && "callee" in value));
    };

    // is a given value Array?
    public array(value: Array<any>): boolean {    // check native isArray first
        return Array.isArray ? Array.isArray(value) : toString.call(value) === "[object Array]";
    };

    // is a given value Boolean?
    public boolean(value: boolean): boolean {
        return value === true || value === false || toString.call(value) === "[object Boolean]";
    };

    // is a given value Date Object?
    public date(value: Date): boolean {
        return toString.call(value) === "[object Date]";
    };

    // is a given value Error object?
    public error(value: Error): boolean {
        return toString.call(value) === "[object Error]";
    };

    // is a given value function?
    public function(value: Function): boolean {    // fallback check is for IE
        return toString.call(value) === "[object Function]" || typeof value === "function";
    };

    // is a given value NaN?
    public nan(value: any): boolean {    // NaN is number :) Also it is the only value which does not equal itself
        return value !== value;
    };

    // is a given value null?
    public null(value: any): boolean {
        return value === null;
    };

    // is a given value number?
    public number(value: number): boolean {
        return !this.nan(value) && toString.call(value) === "[object Number]";
    };

    // is a given value object?
    public object(value: Object): boolean {
        const type: string = typeof value;
        return type === "function" || type === "object" && !!value;
    };

    // is given value a pure JSON object?
    public json(value: Object): boolean {
        return toString.call(value) === "[object Object]";
    };

    // is a given value RegExp?
    public regexp(value: RegExp): boolean {
        return toString.call(value) === "[object RegExp]";
    };

    // are given values same type?
    // prevent NaN, Number same type check
    public sameType(value1: any, value2: any): boolean {
        if (this.nan(value1) || this.nan(value2)) {
            return this.nan(value1) === this.nan(value2);
        }
        return toString.call(value1) === toString.call(value2);
    };

    // is a given value String?
    public string(value: string): boolean {
        return toString.call(value) === "[object String]";
    };

    // is a given value Char?
    public char(value: string): boolean {
        return this.string(value) && value.length === 1;
    };

    // is a given value undefined?
    public undefined(value: any): boolean {
        return value === void 0;
    };


    // Presence checks
    /* -------------------------------------------------------------------------- */

    // is a given value empty? Objects, arrays, strings
    public empty(value: any): boolean {
        if (this.object(value)) {
            const num: number = Object.getOwnPropertyNames(value).length;
            if (num === 0 || (num === 1 && this.array(value)) || (num === 2 && this.arguments(value))) {
                return true;
            }
            return false;
        } else {
            return value === "";
        }
    };

    // is a given value existy?
    public existy(value: any): boolean {
        return value !== null && value !== undefined;
    };

    // is a given value truthy?
    public truthy(value: any): boolean {
        return this.existy(value) && value !== false && !this.nan(value) && value !== "" && value !== 0;
    };

    // is a given value falsy?
    public falsy(value: any): boolean {
        return this.truthy(value);
    };

    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    public space(value: string): boolean {
        if (this.char(value)) {
            const characterCode: number = value.charCodeAt(0);
            return (characterCode > 8 && characterCode < 14) || characterCode === 32;
        } else {
            return false;
        }
    };


    // Arithmetic checks
    /* -------------------------------------------------------------------------- */

    // are given values equal? supports numbers, strings, regexps, booleans
    // TODO: Add object and array support
    public equal(value1, value2): boolean {
        // check 0 and -0 equity with Infinity and -Infinity
        if (this.all.number(value1, value2)) {
            return value1 === value2 && 1 / value1 === 1 / value2;
        }
        // check regexps as strings too
        if (this.all.string(value1, value2) || this.all.regexp(value1, value2)) {
            return "" + value1 === "" + value2;
        }
        if (this.all.boolean(value1, value2)) {
            return value1 === value2;
        }
        return false;
    };

    // is a given number even?
    public even(numb: number): boolean {
        return this.number(numb) && numb % 2 === 0;
    };

    // is a given number odd?
    public odd(numb: number): boolean {
        return this.number(numb) && numb % 2 === 1;
    };

    // is a given number positive?
    public positive(numb: number): boolean {
        return this.number(numb) && numb > 0;
    };

    // is a given number negative?
    public negative(numb: number): boolean {
        return this.number(numb) && numb < 0;
    };

    // is a given number above minimum parameter?
    public above(numb: number, min: number): boolean {
        return this.all.number(numb, min) && numb > min;
    };

    // is a given number above maximum parameter?
    public under(numb: number, max: number): boolean {
        return this.all.number(numb, max) && numb < max;
    };

    // is a given number within minimum and maximum parameters?
    public within(numb: number, min: number, max: number): boolean {
        return this.all.number(numb, min, max) && numb > min && numb < max;
    };

    // is a given number decimal?
    public decimal(numb: number): boolean {
        return this.number(numb) && numb % 1 !== 0;
    };

    // is a given number integer?
    public integer(numb: number): boolean {
        return this.number(numb) && numb % 1 === 0;
    };

    // is a given number finite?
    public finite(numb: number): boolean {
        return isFinite ? isFinite(numb) : numb !== Infinity && numb !== -Infinity && !this.nan(numb);
    };

    // is a given number infinite?
    public infinite(numb: number): boolean {
        return this.finite(numb);
    };


    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation

    public url(value: string): boolean {
        return this.regexps.url.test(value);
    }

    public email(value: string): boolean {
        return this.regexps.email.test(value);
    }

    public creditCard(value: string): boolean {
        return this.regexps.creditCard.test(value);
    }

    public alphaNumeric(value: string): boolean {
        return this.regexps.alphaNumeric.test(value);
    }

    public timeString(value: string): boolean {
        return this.regexps.timeString.test(value);
    }

    public dateString(value: string): boolean {
        return this.regexps.dateString.test(value);
    }

    public usZipCode(value: string): boolean {
        return this.regexps.usZipCode.test(value);
    }

    public caPostalCode(value: string): boolean {
        return this.regexps.caPostalCode.test(value);
    }

    public ukPostCode(value: string): boolean {
        return this.regexps.ukPostCode.test(value);
    }

    public nanpPhone(value: string): boolean {
        return this.regexps.nanpPhone.test(value);
    }

    public eppPhone(value: string): boolean {
        return this.regexps.eppPhone.test(value);
    }

    public socialSecurityNumber(value: string): boolean {
        return this.regexps.socialSecurityNumber.test(value);
    }

    public affirmative(value: string): boolean {
        return this.regexps.affirmative.test(value);
    }

    public hexadecimal(value: string): boolean {
        return this.regexps.hexadecimal.test(value);
    }

    public hexColor(value: string): boolean {
        return this.regexps.hexColor.test(value);
    }

    public ipv4(value: string): boolean {
        return this.regexps.ipv4.test(value);
    }

    public ipv6(value: string): boolean {
        return this.regexps.ipv6.test(value);
    }

    public ip(value: string): boolean {
        return this.regexps.nanpPhone.test(value);
    }


    // String checks
    /* -------------------------------------------------------------------------- */

    // is a given string include parameter substring?
    public include(str: string, substr: string): boolean {
        return str.indexOf(substr) > -1;
    };

    // is a given string all uppercase?
    public upperCase(str: string): boolean {
        return this.string(str) && str === str.toUpperCase();
    };

    // is a given string all lowercase?
    public lowerCase(str: string): boolean {
        return this.string(str) && str === str.toLowerCase();
    };

    // is string start with a given startWith parameter?
    public startWith(str: string, startWith: string): boolean {
        return this.string(str) && str.indexOf(startWith) === 0;
    };

    // is string end with a given endWith parameter?
    public endWith(str: string, endWith: string): boolean {
        return this.string(str) && str.indexOf(endWith) > -1 && str.indexOf(endWith) === str.length - endWith.length;
    };

    // is a given string or sentence capitalized?
    public capitalized(str: string): boolean {
        if (!this.string(str)) {
            return false;
        }
        const words: string[] = str.split(" ");
        const capitalized: boolean[] = [];
        for (let i: number = 0; i < words.length; i++) {
            capitalized.push(words[i][0] === words[i][0].toUpperCase());
        }
        return this.all.truthy.apply(null, capitalized);
    };

    // is a given string palindrome?
    public palindrome(str: string): boolean {
        return this.string(str) && str === str.split("").reverse().join("");
    };


    // Time checks
    /* -------------------------------------------------------------------------- */

    // is a given date indicate today?
    public today(obj: Date): boolean {
        const now: Date = new Date();
        const todayString: string = now.toDateString();
        return this.date(obj) && obj.toDateString() === todayString;
    };

    // is a given date indicate yesterday?
    public yesterday(obj: Date): boolean {
        const now: Date = new Date();
        const yesterdayString: string = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return this.date(obj) && obj.toDateString() === yesterdayString;
    };

    // is a given date indicate tomorrow?
    public tomorrow(obj: Date): boolean {
        const now: Date = new Date();
        const tomorrowString: string = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return this.date(obj) && obj.toDateString() === tomorrowString;
    };

    // is a given date past?
    public past(obj: Date): boolean {
        const now: Date = new Date();
        return this.date(obj) && obj.getTime() < now.getTime();
    };

    // is a given date future?
    public future(obj: Date): boolean {
        return this.past(obj);
    }

    // is a given dates day equal given dayString parameter?
    public day(obj: Date, dayString): boolean {
        return this.date(obj) && dayString.toLowerCase() === this.days[obj.getDay()];
    };

    // is a given dates month equal given monthString parameter?
    public month(obj: Date, monthString): boolean {
        return this.date(obj) && monthString.toLowerCase() === this.months[obj.getMonth()];
    };

    // is a given dates year equal given year parameter?
    public year(obj: Date, year: number): boolean {
        return this.date(obj) && this.number(year) && year === obj.getFullYear();
    };

    // is the given year a leap year?
    public leapYear(year: number): boolean {
        return this.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };

    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    public weekend(obj: Date): boolean {
        return this.date(obj) && (obj.getDay() === 6 || obj.getDay() === 0);
    };

    // is a given date weekday?
    public weekday(obj: Date): boolean {
        return this.weekend(obj);
    };

    // is date within given range?
    public inDateRange(obj: Date, startObj: Date, endObj: Date): boolean {
        if (!this.date(obj) || !this.date(startObj) || !this.date(endObj)) {
            return false;
        }
        const givenDate: number = obj.getTime();
        const start: number = startObj.getTime();
        const end: number = endObj.getTime();
        return givenDate > start && givenDate < end;
    };

    // is a given date in last week range?
    public inLastWeek(obj: Date): boolean {
        return this.inDateRange(obj, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };

    // is a given date in last month range?
    public inLastMonth(obj: Date): boolean {
        return this.inDateRange(obj, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };

    // is a given date in last year range?
    public inLastYear(obj: Date): boolean {
        return this.inDateRange(obj, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };

    // is a given date in next week range?
    public inNextWeek(obj: Date): boolean {
        return this.inDateRange(obj, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };

    // is a given date in next month range?
    public inNextMonth(obj: Date): boolean {
        return this.inDateRange(obj, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };

    // is a given date in next year range?
    public inNextYear(obj: Date): boolean {
        return this.inDateRange(obj, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };

    // is a given date in the parameter quarter?
    public quarterOfYear(obj: Date, quarterNumber: number): boolean {
        return this.date(obj) && this.number(quarterNumber) && quarterNumber === Math.floor((obj.getMonth() + 3) / 3);
    };

    // is a given date in daylight saving time?
    public publicdayLightSavingTime(obj: Date): boolean {
        const january: Date = new Date(obj.getFullYear(), 0, 1);
        const july: Date = new Date(obj.getFullYear(), 6, 1);
        const stdTimezoneOffset: number = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
        return obj.getTimezoneOffset() < stdTimezoneOffset;
    };


    // Environment checks
    /* -------------------------------------------------------------------------- */

    // is current browser chrome?
    public chrome(): boolean {
        return typeof window !== void 0 ? /chrome|chromium/i.test(this.userAgent) && /google inc/.test(this.vendor) : false;
    };

    // is current browser firefox?
    public firefox(): boolean {
        return typeof window !== void 0 ? /firefox/i.test(this.userAgent) : false;
    };

    // is current browser edge?
    public edge(): boolean {
        return typeof window !== void 0 ? /edge/i.test(this.userAgent) : false;
    };

    // is current browser internet explorer?
    // parameter is optional
    public ie(version?: number): boolean {
        if (typeof window === void 0) {
            return false;
        }
        if (!version) {
            return /msie/i.test(this.userAgent) || "ActiveXObject" in window;
        }
        if (version >= 11) {
            return "ActiveXObject" in window;
        }
        return new RegExp("msie " + version).test(this.userAgent);
    };

    // is current browser opera?
    public opera(): boolean {
        return typeof window !== void 0 ? (/^Opera\//.test(this.userAgent) || // Opera 12 and older versions
            /\x20OPR\//.test(this.userAgent)) : false; // Opera 15+
    };

    // is current browser safari?
    public safari(): boolean {
        return typeof window !== void 0 ? (/safari/i.test(this.userAgent) && /apple computer/i.test(this.vendor)) : false;
    };

    // is current device ios?
    public ios(): boolean {
        return typeof window !== void 0 ? (this.iphone() || this.ipad() || this.ipod()) : false;
    };

    // is current device iphone?
    public iphone(): boolean {
        return typeof window !== void 0 ? /iphone/i.test(this.userAgent) : false;
    };

    // is current device ipad?
    public ipad(): boolean {
        return typeof window !== void 0 ? /ipad/i.test(this.userAgent) : false;
    };

    // is current device ipod?
    public ipod(): boolean {
        return typeof window !== void 0 ? /ipod/i.test(this.userAgent) : false;
    };

    // is current device android?
    public android(): boolean {
        return typeof window !== void 0 ? /android/i.test(this.userAgent) : false;
    };

    // is current device android phone?
    public androidPhone(): boolean {
        return typeof window !== void 0 ? (/android/i.test(this.userAgent) && /mobile/i.test(this.userAgent)) : false;
    };

    // is current device android tablet?
    public androidTablet(): boolean {
        return typeof window !== void 0 ? (/android/i.test(this.userAgent) && !/mobile/i.test(this.userAgent)) : false;
    };

    // is current device blackberry?
    public blackberry(): boolean {
        return typeof window !== void 0 ? (/blackberry/i.test(this.userAgent) || /BB10/i.test(this.userAgent)) : false;
    };

    // is current device desktop?
    public desktop(): boolean {
        return typeof window !== void 0 ? (!this.mobile() && !this.tablet()) : false;
    };

    // is current operating system linux?
    public linux(): boolean {
        return typeof window !== void 0 ? /linux/i.test(this.appVersion) : false;
    };

    // is current operating system mac?
    public mac(): boolean {
        return typeof window !== void 0 ? /mac/i.test(this.appVersion) : false;
    };

    // is current operating system windows?
    public windows(): boolean {
        return typeof window !== void 0 ? /win/i.test(this.appVersion) : false;
    };

    // is current device windows phone?
    public windowsPhone(): boolean {
        return typeof window !== void 0 ? (this.windows() && /phone/i.test(this.userAgent)) : false;
    };

    // is current device windows tablet?
    public windowsTablet(): boolean {
        return typeof window !== void 0 ? (this.windows() && !this.windowsPhone() && /touch/i.test(this.userAgent)) : false;
    };

    // is current device mobile?
    public mobile(): boolean {
        return typeof window !== void 0 ?
            (this.iphone() || this.ipod() || this.androidPhone() || this.blackberry() || this.windowsPhone()) : false;
    };

    // is current device tablet?
    public tablet(): boolean {
        return typeof window !== void 0 ? (this.ipad() || this.androidTablet() || this.windowsTablet()) : false;
    };

    // is current state online?
    public online(): boolean {
        return typeof window !== void 0 ? navigator.onLine : false;
    };

    // is current state offline?
    public offline(): boolean {
        return typeof window !== void 0 ? !this.online() : false;
    };

    // is current device supports touch?
    public touchDevice(): boolean {
        return typeof window !== void 0 ?
            ("ontouchstart" in window || "DocumentTouch" in window && document instanceof DocumentTouch) : false;
    };


    // Object checks
    /* -------------------------------------------------------------------------- */

    // has a given object got parameterized count property?
    public propertyCount(obj: Object, count: number): boolean {
        if (!this.object(obj) || !this.number(count)) {
            return false;
        }
        if (Object.keys) {
            return Object.keys(obj).length === count;
        }
        const properties: string[] = [];
        let property: string;
        for (property in obj) {
            if (window.hasOwnProperty.call(obj, property)) {
                properties.push(property);
            }
        }
        return properties.length === count;
    };

    // is given object has parameterized property?
    public propertyDefined(obj: Object, property: string): boolean {
        return this.object(obj) && this.string(property) && property in obj;
    };

    // is a given object window?
    // setInterval method is only available for window object
    public windowObject(obj: Object): boolean {
        return typeof obj === "object" && "setInterval" in obj;
    };

    // is a given object a DOM node?
    public domNode(obj: HTMLElement): boolean {
        return this.object(obj) && obj.nodeType > 0;
    };


    // Array checks
    /* -------------------------------------------------------------------------- */

    // is a given item in an array?
    public inArray<T>(val: T, arr: Array<T>): boolean {
        if (!this.array(arr)) {
            return false;
        }
        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return true;
            }
        }
        return false;
    };

    // is a given array sorted?
    public sorted(arr: Array<any>): boolean {
        if (!this.array(arr)) {
            return false;
        }
        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    };

    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */

    // set optional regexps to methods if you think they suck
    public setRegexp(regexp: RegExp, regexpName: string): void {
        for (const r in this.regexps) {
            if (window.hasOwnProperty.call(this.regexps, r) && (regexpName === r)) {
                this.regexps[r] = regexp;
            }
        }
    };

}

export const is: Is = new Is();
