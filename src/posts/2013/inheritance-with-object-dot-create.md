---
title: "Inheritance with Object.create()"
date: 2013-01-06 00:43
tags: [javascript]
template: post
---

Recently I did some research on inheritance in JS and found out some old issues. I wanted to use inheritance pattern for my Web Audio API framework, but it seems like the new feature of ECMA Script is not optimized enough. Literally it is 95% slower than using traditional “new” operator.

The good news is I don’t have to rewrite all the classes, but the sad one is the code structure won’t get cleaned. Anyhow, I am enumerating references I found so I can revisit on this issue later.

  - [MDN Reference on Object.create()][1]
  - [DailyJS.com - JS101: Object.create][2]
  - [Tojicode - The somewhat depressing state of Object.create performance][3]
  - [JSPerf - Object.create vs Crockford vs Constructor][4]

On second thought:

I will be probably using this technique on unified networking of different types of unit generators. Usually (and traditionally) UGen patching happens once at the beginning of execution and we don’t do it at the level of thousands or hundreds. Using 100 oscillator will hit harder on CPU rather than the slow performance of Object.create().

Only thing lingering inside my head is dynamic creation of UGen. If an UGen needs to be created in runtime (in a loop), the slow performance of constructor could be disastrous. However, it is sort of obvious the Chrome or Safari will be improved sooner or later.

I still haven’t decided what to do about this. Probably I have to go with the current implementation and publish it on NIME, then I will fix it after WebKit is optimized.

[1]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
[2]: http://dailyjs.com/2012/06/04/js101-object-create/
[3]: http://blog.tojicode.com/2011/08/somewhat-depressing-state-of.html
[4]: http://jsperf.com/object-create-vs-crockford-vs-jorge-vs-constructor/26