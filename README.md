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

Type checks
===========

```javascript

is.arguments(arguments);
=> true

is.array(['foo', 'bar', 'baz']);
=> true

is.boolean(true);
=> true

is.date(new Date());
=> true

is.error(new Error());
=> true

is.function(toString);
=> true

is.nan(NaN);
=> true

is.null(null);
=> true

is.number(42);
=> true

is.number(NaN);
=> false

is.object({foo: 'bar'});
=> true

is.json({foo: 'bar'});
=> true

// functions are returning as false
is.json(toString);
=> false

is.regexp(/test/);
=> true

is.string('foo');
=> true

is.char('f');
=> true

is.undefined(undefined);
=> true

is.sameType(42, 7);
=> true

is.sameType(42, '7');
=> false

is.empty({});
=> true

is.empty([]);
=> true

is.empty('');
=> true

is.existy({});
=> true

is.existy(null);
=> false

is.truthy(true);
=> true

is.truthy(null);
=> false

is.falsy(false);
=> true

is.falsy(null);
=> true

is.space(' ');
=> true

is.space('foo');
=> false

is.url('http://www.test.com');
=> true

is.url('foo');
=> false

is.email('test@test.com');
=> true

is.email('foo');
=> false

is.creditCard(378282246310005);
=> true

is.creditCard(123);
=> false

is.alphaNumeric('alphaNu3er1k');
=> true

is.alphaNumeric('*?');
=> false

is.timeString('13:45:30');
=> true

is.timeString('90:90:90');
=> false

is.dateString('11/11/2011');
=> true

is.dateString('90/11/2011');
=> false

is.usZipCode('02201-1020');
=> true

is.usZipCode('123');
=> false

is.caPostalCode('L8V3Y1');
=> true

is.caPostalCode('L8V 3Y1');
=> true

is.caPostalCode('123');
=> false

is.ukPostCode('B184BJ');
=> true

is.ukPostCode('123');
=> false

is.nanpPhone('609-555-0175');
=> true

is.nanpPhone('123');
=> false

is.eppPhone('+90.2322456789');
=> true

is.eppPhone('123');
=> false

is.socialSecurityNumber('017-90-7890');
=> true

is.socialSecurityNumber('123');
=> false

is.affirmative('yes');
=> true

is.affirmative('no');
=> false

is.hexadecimal('f0f0f0');
=> true

is.hexadecimal(2.5);
=> false

is.hexColor('#333');
=> true

is.hexColor('#3333');
=> false

is.ip('198.156.23.5');
=> true

is.ip('1.2..5');
=> false

is.ipv4('198.12.3.142');
=> true

is.ipv4('1.2..5');
=> false

is.ipv6('2001:DB8:0:0:1::1');
=> true

is.ipv6('985.12.3.4');
=> true

is.include('Some text goes here', 'text');
=> true

is.include('test', 'text');
=> false

is.upperCase('YEAP');
=> true

is.upperCase('nope');
=> false

is.lowerCase('yeap');
=> true

is.lowerCase('NOPE');
=> false

is.startWith('yeap', 'ye');
=> true

is.startWith('nope', 'ye');
=> false

is.endWith('yeap', 'ap');
=> true

is.endWith('nope', 'no');
=> false

is.endWith('yeap that one', 'one');
=> true

is.capitalized('Yeap');
=> true

is.capitalized('nope');
=> false

is.palindrome('testset');
=> true

is.palindrome('nope');
=> false

is.equal(42, 40 + 2);
=> true

is.equal('yeap', 'yeap');
=> true

is.equal(true, true);
=> true

is.even(42);
=> true

is.odd(41);
=> true

is.positive(41);
=> true

is.negative(-41);
=> true

is.above(41, 30);
=> true

is.under(30, 35);
=> true

is.within(30, 20, 40);
=> true

is.decimal(41.5);
=> true

is.integer(41);
=> true

is.finite(41);
=> true

is.infinite(Infinity);
=> true

is.propertyCount({this: 'is', 'sample': object}, 2);
=> true

is.propertyCount({this: 'is', 'sample': object}, 3);
=> false

is.propertyDefined({yeap: 'yeap'}, 'yeap');
=> true

is.propertyDefined({yeap: 'yeap'}, 'nope');
=> false

is.windowObject(window);
=> true

is.windowObject({nope: 'nope'});
=> false

is.domNode({nope: 'nope'});
=> false

is.inArray(2, [1, 2, 3]);
=> true

is.inArray(4, [1, 2, 3]);
=> false

is.sorted([1, 2, 3]);
=> true

is.sorted([1, 2, 4, 3]);
=> false

is.ie();
=> true if current browser is ie

is.ie(6);
=> hopefully false

is.chrome();
=> true if current browser is chrome

is.firefox();
=> true if current browser is firefox

is.edge();
=> true if current browser is edge

is.opera();
=> true if current browser is opera

is.safari();
=> true if current browser is safari

is.ios();
=> true if current device is iPhone, iPad or iPod

is.iphone();
=> true if current device is iPhone

is.ipad();
=> true if current device is iPad

is.ipod();
=> true if current device is iPod

is.android();
=> true if current device has Android OS

is.androidPhone();
=> true if current device is Android phone

is.androidTablet();
=> true if current device is Android tablet

is.blackberry();
=> true if current device is Blackberry

is.windowsPhone();
=> true if current device is Windows phone

is.windowsTablet();
=> true if current device is Windows tablet

is.windows();
=> true if current OS is Windows

is.mac();
=> true if current OS is Mac OS X

is.linux();
=> true if current OS is linux

is.desktop();
=> true if current device is desktop

is.mobile();
=> true if current device is mobile

is.tablet();
=> true if current device is tablet

is.online();
=> true if current device is online

is.offline();
=> true if current device is offline

is.touchDevice();
=> true if current device supports touch

var today = new Date();
is.today(today);
=> true

var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
is.today(yesterday);
=> false

var today = new Date();
is.yesterday(today);
=> false

var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
is.yesterday(yesterday);
=> true

is.not.yesterday(today);
=> true

is.all.yesterday(yesterday, today);
=> false

is.any.yesterday(today, yesterday);
=> true

// 'all' and 'any' interfaces can also take array parameter
is.all.yesterday([today, yesterday]);
=> false
```

is.tomorrow(value:object)
-------------------------
####Checks if the given date object indicate tomorrow.
interfaces: not, all, any

```javascript
var today = new Date();
is.tomorrow(today);
=> false

var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
is.tomorrow(tomorrow);
=> true

is.not.tomorrow(today);
=> true

is.all.tomorrow(tomorrow, today);
=> false

is.any.tomorrow(today, tomorrow);
=> true

// 'all' and 'any' interfaces can also take array parameter
is.all.tomorrow([today, tomorrow]);
=> false
```

is.past(value:object)
---------------------
####Checks if the given date object indicate past.
interfaces: not, all, any

```javascript
var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

is.past(yesterday);
=> true

is.past(tomorrow);
=> false

is.not.past(tomorrow);
=> true

is.all.past(tomorrow, yesterday);
=> false

is.any.past(yesterday, tomorrow);
=> true

// 'all' and 'any' interfaces can also take array parameter
is.all.past([yesterday, tomorrow]);
=> false
```

is.future(value:object)
-----------------------
####Checks if the given date object indicate future.
interfaces: not, all, any

```javascript
var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

is.future(yesterday);
=> false

is.future(tomorrow);
=> true

is.not.future(yesterday);
=> true

is.all.future(tomorrow, yesterday);
=> false

is.any.future(yesterday, tomorrow);
=> true

// 'all' and 'any' interfaces can also take array parameter
is.all.future([yesterday, tomorrow]);
=> false
```

is.day(value:object, dayString)
-------------------------------
####Checks if the given date objects' day equal given dayString parameter.
interface: not

```javascript
var mondayObj = new Date('01/26/2015');
var tuesdayObj = new Date('01/27/2015');
is.day(mondayObj, 'monday');
=> true

is.day(mondayObj, 'tuesday');
=> false

is.not.day(mondayObj, 'tuesday');
=> true
```

is.month(value:object, monthString)
-----------------------------------
####Checks if the given date objects' month equal given monthString parameter.
interface: not

```javascript
var januaryObj = new Date('01/26/2015');
var februaryObj = new Date('02/26/2015');
is.month(januaryObj, 'january');
=> true

is.month(februaryObj, 'january');
=> false

is.not.month(februaryObj, 'january');
=> true
```

is.year(value:object, yearNumber)
---------------------------------
####Checks if the given date objects' year equal given yearNumber parameter.
interface: not

```javascript
var year2015 = new Date('01/26/2015');
var year2016 = new Date('01/26/2016');
is.year(year2015, 2015);
=> true

is.year(year2016, 2015);
=> false

is.not.year(year2016, 2015);
=> true
```

is.leapYear(value:number)
---------------------------------
####Checks if the given year number is a leap year
interfaces: not, all, any

```javascript
is.leapYear(2016);
=> true

is.leapYear(2015);
=> false

is.not.leapYear(2015);
=> true

is.all.leapYear(2015, 2016);
=> false

is.any.leapYear(2015, 2016);
=> true

// 'all' and 'any' interfaces can also take array parameter
is.all.leapYear([2016, 2080]);
=> true
```

is.weekend(value:object)
------------------------
####Checks if the given date objects' day is weekend.
interfaces: not, all, any

```javascript
var monday = new Date('01/26/2015');
var sunday = new Date('01/25/2015');
var saturday = new Date('01/24/2015');
is.weekend(sunday);
=> true

is.weekend(monday);
=> false

var monday = new Date('01/26/2015');
var sunday = new Date('01/25/2015');
var saturday = new Date('01/24/2015');
is.weekday(monday);
=> true

is.weekday(sunday);
=> false

var saturday = new Date('01/24/2015');
var sunday = new Date('01/25/2015');
var monday = new Date('01/26/2015');
is.inDateRange(sunday, saturday, monday);
=> true

is.inDateRange(saturday, sunday, monday);
=> false

var twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
var nineDaysAgo = new Date(new Date().setDate(new Date().getDate() - 9));
is.inLastWeek(twoDaysAgo);
=> true

is.inLastWeek(nineDaysAgo);
=> false

var tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10));
var fortyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 40));
is.inLastMonth(tenDaysAgo);
=> true

is.inLastMonth(fortyDaysAgo);
=> false

var twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2));
var thirteenMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 13));
is.inLastYear(twoMonthsAgo);
=> true

is.inLastYear(thirteenMonthsAgo);
=> false

var twoDaysLater = new Date(new Date().setDate(new Date().getDate() + 2));
var nineDaysLater = new Date(new Date().setDate(new Date().getDate() + 9));
is.inNextWeek(twoDaysLater);
=> true

is.inNextWeek(nineDaysLater);
=> false

var tenDaysLater = new Date(new Date().setDate(new Date().getDate() + 10));
var fortyDaysLater = new Date(new Date().setDate(new Date().getDate() + 40));
is.inNextMonth(tenDaysLater);
=> true

is.inNextMonth(fortyDaysLater);
=> false

var twoMonthsLater = new Date(new Date().setMonth(new Date().getMonth() + 2));
var thirteenMonthsLater = new Date(new Date().setMonth(new Date().getMonth() + 13));
is.inNextYear(twoMonthsLater);
=> true

is.inNextYear(thirteenMonthsLater);
=> false

var firstQuarter = new Date('01/26/2015');
var secondQuarter = new Date('05/26/2015');
is.quarterOfYear(firstQuarter, 1);
=> true

is.quarterOfYear(secondQuarter, 1);
=> false

// For Turkey Time Zone
var january1 = new Date('01/01/2015');
var june1 = new Date('06/01/2015');

is.dayLightSavingTime(june1);
=> true

is.dayLightSavingTime(january1);
=> false

is.url('https://www.duckduckgo.com');
=> true

is.setRegexp(/quack/, 'url');
is.url('quack');
=> true

var customName = is.setNamespace();
customName.odd(3);
=> true
```
