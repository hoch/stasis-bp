---
title: "The Art of Parameter Control"
date: 2013-04-23 10:14
tags: ['waax', 'web audio', 'javascript']
template: post
---

> NOTE: The content of this article is OBSOLETE. The latest version of WAAX uses different methods for parameter control.

This is a proposal of API for parameter control in the next revision of WAAX. I am just putting it here to organize and revise the idea out loud.


### Timed Parameter Control: `AudioParam`

In Web Audio API, [AudioParam][2] object is sort of a hidden object (meaning users cannot construct) and its purpose is to control parameters with sample-accurate time precision. It includes operations such as immediate change, or interpolation with linear, exponential or even arbitrary transition curve.

The primary reason of this layer is the web browser and JavaScript does not provide solid timing structure. The single-thread architecture of the browser always suffers from rendering visual contents, handling UI events and all other stuffs. This is why you cannot rely on the vanilla JavaScript functions like `setTimeout()` or `setInterval()` to trigger the musical events for Web Audio API. (Chris Wilson wrote [an in-depth article][1] on this problem.)

Also the introduction of `AudioParam` made possible to inherit the concept of two separate layers of parameter control: _audio rate (a-rate)_ and _control rate (k-rate)_. (I believe these terms are originated from CSound era) In short, the audio rate parameter is for relatively fast control. The speed of parameter change is usually not perceivable to our ears resulting the change of timbre instead. On the contrary, changing parameters with control rate is relatively slow (below 20Hz) and the result of it is more likely to be heard. 

~~~js
// from sample stream (audio) to frequency AudioParam (a-rate)
modulator.connect(carrier.frequency)

// manipulating AudioParam (k-rate) in time
var f = carrier.frequency;
f.setValueAtTime(440.0, 1.0);
f.linearRampToValueAtTime(880.0, 4.0);
~~~

When you are dealing with any of audio programming environments understanding this scheme is crucial, or I should say the designers of those platforms forced user to accept the concept as whole. From the real-time audio programming environments, perhaps ChucK is the only language that ignores the difference between two worlds, but still the sample-accurate execution consumes sizable CPU power. (However, this is sort of vague due to the huge chunk of STK unit generators resides in ChucK.)


### Encapsulating `AudioParam`

The approach I devised is a method named `bindParameter()` for WAAX units. Here goes the proposed interface:

~~~js
// bindParameter()
unit.bindParameter("parameterName", targetAudioParam);

// usage: this.oscil is an oscillator node
this.bindParameter("freq", this.oscil.frequency);
~~~

Once a parameter is hooked to an `AudioParam`, user can use a set of methods that provides sample-accurate manipulation. 

~~~js
// get parameter value at now (context.currentTime)
osc.freq(); 

// set value immediately or at specified *timeline*
osc.freq(220);

// jump to a value in 1 second
osc.freq(220, 1.0);

// linear ramping in 1 second
osc.freq(220, 1.0, "line");

// exponential ramping in 1 second
osc.freq(220, 1.0, "expo");

// reference to AudioParam for additional manipulation
osc.freq_
~~~

When the event-driven control is needed, user can easily access to methods above. However, the last on the list is a reference to AudioParam and it can be used as a token of **coupling** which is described in the following section.


### Coupling

I dare to declare my take on the convention of _modulation._ Not only the wording modulation has been used excessively enough throughout different areas with different meanings, but also it seems inappropriate to use the term for parameter control happening in the macro level (_k-rate_). So I took it a bit further with the new wording: **Coupling**.

Literally, **coupling** is the process that couples two objects to get them moving together. It should not matter whether those objects operate in _a-rate_ or _k-rate_. The goal of this cleverness is to hide the complication underneath. Usually a _modulation_ is a name of techniques or formulations, however, a coupling is more about how you control the parameter. Here I defined two types of coupling:


#### Continuous Coupling

If the source of coupling is manipulating the target parameter continuously, it is labeled as _continuous coupling_. For example, a LFO(low frequency oscillator) is commonly used to create tremolo or vibrato. The relationship between an LFO and a target oscillator is not triggered or stopped by other control mechanisms, but you can control the amount of effect by adjusting parameters of the coupling source.

~~~js
// creates a coupling for simple vibrato
var vib = lfo.couple(osc.freq_);

// adjusting vibrato depth and rate
lfo.gain(20.0).freq(10.0);

// don't forget you can modulate the modulator
lfo2.couple(lfo.gain_);

// break up the relationship
vib.break();
~~~

As mentioned previously, the `.freq_` reference is being used in setting a coupling target. All the modulator units will be furnished with the `.couple(AudioParam)` method that returns a handle to the coupling. `.break()` method will end the relationship between the coupling source and the target; the concept of _objectified relationship_ lies here.


#### Event-driven Coupling

The event-driven coupling is an essential feature for musical control. The event list below is quite similar to common MIDI data and it is being fetched by an envelope modulator unit to render a series of timed events.

~~~js
// an event list: (value, time) pairs
events = [[0.0, 0.0], [1.0, 1.0], [0.0, 2.0]];

// couple modulator:envelope with osc.gain
env.couple(osc.gain_);
env.set(events);
env.start();
~~~


### What is next?

Still it looks like an OOP or an imperative approach, but it will do its job pretty well with a terse and human readable syntax. For the moment, I am quite satisfied with this proposal, but I will have a good look on it over time to avoid as many mistakes as I can.

Lastly, from recent discussions with Chris Chafe and Jonathan Berger, we have agreed that the functional elements might be quite useful in a certain context - as we have seen in CLM - and I believe JavaScript definitely has that aspect. It surely can be an interesting direction to move on.

[1]: http://www.html5rocks.com/en/tutorials/audio/scheduling/
[2]: https://developer.mozilla.org/en-US/docs/DOM/AudioParam/