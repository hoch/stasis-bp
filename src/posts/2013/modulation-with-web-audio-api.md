---
title: "Modulation with Web Audio API"
date: 2013-03-13 21:59
tags: ['waax', 'web audio', 'javascript']
template: post
---

> NOTE: The WAAX code in this article is OBSOLETE.

From my 20-years of knowledge in computer music and sound synthesis, it is quite surprising that the majority of computer music programming paradigms failed to formulate a way of modulation. Instead, we tried to understand how it works and roll everything out into an incomprehensible cipher.

We, computer musicians, sort of took it for granted; we do many things in hacky ways. Those approaches of "trick and tips" are all over the place. Maybe all we have been doing is just _prototyping_ and most of them are non-polished, experimental, and proof-of-concept.

This essay partially covers the various implementations of FM synthesis, which is de facto "hello world" example of sound modulation and that is to see how we have been making progress and also to see how we can improve the methodologies.

Let us start with a snippet of pseudo code implements frequency modulation.

```c
// carrier & modulator frequency, modulation index
float cf, mf, mi;
// phase for carrier and modulator
float cp, mp;
// ticker
float tick = TWOPI / sampleRate;

// sample generator for modulator
modGen() {
  mp += tick * mf;
  mp = (mp > TWOPI) ? mp - TWOPI : mp;
  return sin(mp);
}

// sample generator for carrier
carGen() {
  cp += tick * (cf + modGen() * mi);
  cp = (cp > TWOPI) ? cp - TWOPI : cp;
  return sin(cp);
}
```
The real implementation of FM synthesis in C is quite longer than this, so I put a bit of effort to make the code more readable and sensible. It is still good enough to demonstrate how FM synthesis works; it has two sine oscillators and the one called modulator outputs a sample which will affect the other oscillator's frequency. 

There are many variations of FM implementation, especially the one with harmonic ratio, but that's just to bring musical element into it by constraining the harmonic relationship between two oscillators. (Another post will cover this in near future.)


```lisp
(SynthDef("fm", { 
  arg bus, cf, mf, mi;
  var mod;
  var car;  
  mod = SinOsc.ar(mf, 0, index);
  car = SinOsc.ar(cf + mod, 0);
  Out.ar(bus, car)
}).load(s);)
```

And the new era came. [SuperCollider](http://supercollider.sourceforge.net/) is a modern computer music language introduced at 1996. The terse syntax is quite remarkable; no more micro-sample level coding here. (I am not saying it is necessarily a good thing.)

The project has been quite successful so far, even after the original author joined Apple to take charge in the development of Core Audio framework. Since open-sourced, it is still actively being developed by its community.

~~~lisp
(do ((i beg (+ i 1)))
  ((= i end))
      (let ((modulation (* fm-index (sin modulator-phase)))
      (fm-val (* amp (sin carrier-phase))))
  (set! carrier-phase (+ carrier-phase modulation carrier-phase-incr))
  (set! modulator-phase (+ modulator-phase modulator-phase-incr))
  (outb i fm-val)))
~~~

[CLM](https://ccrma.stanford.edu/software/clm/). A language for computer music based on LISP around 2000. From my perspective, it is the most pedantic and nerdy way of synthesizing sound. However, the logic inside the code is identical to the c code discussed previously.

Although the code presented is sample-level implementation, in fact CLM provides a unit generator named "oscil" which is capable of frequency and phase modulation in a macro way like what SuperCollider does.

~~~js
// carrier & modulator frequency, modulation index
float cf, mf, mi
// carrier, modulator and setting modulator frequency
SinOsc c => dac;
SinOsc m => blackhole;
mf => m.freq;
// FM by hand (sample level)
while (true) {
  cf + (mi * m.last()) => c.freq;
  1::samp => now;  
}
~~~

The advent of [ChucK](http://chuck.cs.princeton.edu/) in 2003 successfully twisted the perspective and the convention of computer music language by introducing something "fun" and "readable." ChucK embraces concepts of object-oriented method as a programming framework expanding the world of audio programming. Considering the majority of programmer are familiar with OOP, it was quite acceptable and approachable at the moment.

ChucK also offers two ways of FM implementation: sample-level and macro-level. The code above demonstrates the sample-level method. Having its own cuteness, the ChucK operator(=>), its syntax is very terse, clear and fun. However, flipping the position of operand and the direction of assignment brought a quite amount of confusion. (or was totally unacceptable to some population of audio hackers.)


~~~js
// create audio context
var ctx = new webkitAudioContext();
// two oscillators and one gain
var mod = ctx.createOscillator(),
    modIndex = ctx.createGain(),
    car = ctx.createOscillator();
// setting parameters
mod.frequency.value = 100;
modIndex.gain.value = 40;
car.frequency.value = 440;
// connect all
mod.connect(modIndex);
modIndex.connect(car);
car.connect(destination);
~~~

Web Audio API, recently introduced compared to examples so far, is programmed by JavaScript on the browser. Its syntax is very similar with other web standard API included in modern browsers; that also means this API is designed for real production, not much for experiments.

Although it supports sample-level audio generation through a "scriptable audio node", the method is not recommended because the synthesis will suffer from other processes running on the browser resulting missing samples in time. So I decided to make this code much simpler by adopting good parts from the examples I showed above.

~~~js
// two oscillator units
var car = WX.Oscil({ frequency:440 }), 
    mod = WX.Oscil({ frequency:100, gain:40 });
// set modulation
mod.modulate(car.params.frequency);
// connect FM operator to DAC
car.to(WX.DAC);
~~~

By using WAAX, the life of web audio developer can be much easier. By creating two oscillators and setting modulation from one to the other, frequency modulation is done. Retuning to the statement I made at the beginning of this post, WAAX actually impose a way of modulation in a programmatic way. It also  explicitly provides a way of creating relationship between modulation source and destination; it offers a modulation object you can play. but that is going to be another post soon.