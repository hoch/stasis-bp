---
title: "A Thought on Building Audiograph"
date: 2013-02-14 09:57
tags: ['waax', 'web audio', 'javascript']
template: post
---

_NOTE: This content is OBSOLTE. It is written for WAAX r5. The latest version of WAAX uses different method for audiograph building._

The current implementation of "a one-liner" in WAAX is based on the ``.to()`` method. It works fine but somehow it significantly hurts the readability of code as shown below.

```js
var foo = new WX.Unit(), 
    bar = new WX.Unit(), 
    baz = new WX.Unit();
    qux = new WX.Unit();
// srsly wtf
foo.to(bar).to(baz).to(qux);
```

It is known that the operator overloading in JavaScript is [impossible][1]. So the "syntactic sugar" used in [ChucK][2] cannot be an option. However, I had the idea (which might be hacky and ugly) of using getter/setter for an audiograph generation and here's the pilot implementation.

```js
WX.Unit = function () {
  Object.defineProperties(this, {
    _inlet: {
      enumerable: false,
      writable: false,
      value: WX._context.createGainNode()
    },
    _outlet: {
      enumerable: false,
      writable: false,
      value: WX._context.createGainNode()
    }
  });
  this._inlet.connect(this._outlet);
};
```

So the basic plumbing has not been changed much. It still encapsulates the unit with two internal gain nodes and anything can happen between them. It is worth mentioning that the code above is hiding inlet/outlet nodes behind the abstraction. Although one can directly access these nodes, but they will not be included in the enumeration process an well as prohibiting to overwrite them. The next snippet demonstrates how to design getter/setter in order to impose the symbolic meaning of "making connection" between two nodes.

```js
WX.Unit.prototype = Object.create(null, {
  o: {
    enumerable: false,
    get: function () {
      return this._inlet;
    },
    set: function (inlet) {
      this._outlet.connect(inlet);
      return inlet;
    }
  }
});
```

This design allows to connecting two units with the `=` operator. Still, attaching the `.o` property to use this method is required, but it brings the good readability with less code. So I would say it is a better design compared to the previous one. Also there is a decent metaphor in this: `o` as a port and `=` as a cable. Note that the setter returns the object itself passed as an argument and some folks might deny this design due to the inconsistency to conventions. It is the necessary evil in realizing this concept.

```js
var foo = new WX.Unit(),
    bar = new WX.Unit(),
    baz = new WX.Unit(),
    qux = new WX.Unit();
// holy cow: o = o = o = o
foo.o = bar.o = baz.o = qux.o; 
```

**However, this does not work as intended due to the default behavior of setter and getter.** This design is based on the assumption the evaluation order shown below:

```js
foo.o = bar.o = baz.o = qux.o; 
                baz.o = qux.o  (1)
        bar.o = baz.o          (2)
foo.o = bar.o                  (3)
```

In fact, the getter will be called only once for `qux.o` carrying its result up to the first setter. In other words, actual "getting" happens only once for the most right object without re-evaluation during the rest of the process. The below snippet shows the actual execution order:

```js
foo.o = bar.o = baz.o = qux.o; 
                baz.o = qux.o  (1)
        bar.o = qux.o          (2)
foo.o = qux.o                  (3)
```
As a result, the last unit will be connected to the other 3 units leaving them unconnected to each other. This is bad and not doing what I imagined. So I am going back to square one - reincarnation of the method `.to()`. Also I created the function `WX.link()` for the simpler usage:

```js
// they are identical!
foo.to(bar).to(baz).to(qux);
WX.link(foo, bar, baz, qux);
```

The latter method is available in r3. For the simple connection, one can use `.to()` method or can use the other to build a long signal path. Hope this makes better sense to people out there. Finger crossed!

[1]: http://stackoverflow.com/questions/1634341/overloading-arithmetic-operators-in-javascript
[2]: http://chuck.cs.princeton.edu/
