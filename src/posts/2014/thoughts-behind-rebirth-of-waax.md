---
title: "Thoughts behind: Rebirth of WAAX"
date: 2014-07-08 15:07
tags: ["WAAX","web audio","JavaScript"]
template: post
---


### First, My Apologies!

I started [WAAX project](http://www.github.com/hoch/WAAX) about two years ago. It has been my weekday research and the weekend hacking chore. I even wrote a conference paper about it and the project was introduced at [HTML5 Weekly](http://html5weekly.com/issues/89) once. In the meantime, I showed off [WAAX](https://www.youtube.com/watch?v=mcl7HPbWXlE) at [CCRMA](https://ccrma.stanford.edu/events/hongchan-choi-waax-web-audio-api-extension) as well.

Soon I realized the project was only getting bigger and I could not handle it efficiently by myself. Also it was really hard to get like-minded people on board. The biggest problem is I had zero knowledge on how the modern web development works. When I see the initial revision `r5` on GitHub, it is nothing but pure embarrassment. (especially the `compile.jar` part.)

Last year, I did my internship at Google Chrome with the author of Web Audio API to peek at the future of web-based music software. Many things happened and they changed how I think and believe on music making on the web. 

Furthermore, everyone talked about tool chaining, build script, and dependency management. It was an eye-opening moment for me. However, it took me quite a while until I can fully adopt those improvements to the project. That is why many broken promises were made on README file in the current GitHub repository.


### WAAX v1.0.0

The purpose of this post is to announce that I am actively preparing to release __WAAX v0.0.1__. Here are few things noteworthy:


#### 1. WAAX Goes SemVer

As you can see, WAAX goes [SemVer](http://semver.org/spec/v2.0.0.html). Fiddling with revision stops at `r15`.

#### 2. A Bold Proposal: WAPL, Web Audio PLug-in Format

Although the concept of plug-in already existed in the previous revisions, now it is solidified enough to be proposed to the developer community. Dubbed as __WAPL__ (Web Audio PLug-in format), the plug-in system which is categorized, modularized and inter-operable with other Web Audio frameworks. (More detailed proposal will be posted later.)

#### 3. Detaching Core Features from Everything Else

By emphasizing modularity, the core WAAX library focuses more on supporting web audio sub system and the plug-ins. _Units_, the plug-ins for the previous version of WAAX, are not the integral part of library any more. They are installed or loaded as needed.

In addition, _Unit_ was rather a minimal building block for synthesizer/effect such as oscillator or filter, but the plug-in is a feature-complete module such as virtual instrument or effect processor.

#### 4. Art of Parameter Control

The newly designed method for parameter control, `unit.set(param, arg)` is concise and powerful. In conjunction with the new __envelope generator__, playing with audio parameters becomes something you can enjoy.

~~~javascript
// imaginary plug-in synth and template envelope from generator
var mySynth = WX.MySynth(),
    env = WX.Envelope([0.0, 0.0], [0.8, 0.02, 1], [0.0, 2.0, 2]);  

// parameter control
mySynth.set('gain', 0.2).set('pitch', 60);
mySynth.set('filterFreq', env(WX.now + 2.0));
~~~

#### 5. MUI: Polymer-powered GUI for Music

__MUI(Musical User Interface)__ was also introduced in `r15`. It was the first attempt to use Web Component in the musical context. Currently I am focusing on the groundwork rather than creating many custom elements, so other developers can join the club without dealing with bolts and nuts.

~~~javascript
// imaginary plug-in synth
var mySynth = WX.MySynth();

// bind MUI element to a synth paramter
MUI.$('knobDomId').bind(mySynth, 'filterFreq');
~~~

#### 6. Complete Developement Setup: Build and Test

The new version of WAAX repository offers an automated build system with [npm](https://www.npmjs.org/), [Bower](http://bower.io/), and [Grunt](http://gruntjs.com/). Minifying core and plug-in scripts or generating front-end scaffolding for WAAX apps will be a breeze. For the client-side (in-browser) testing, WAAX now uses [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/). Continuous Integration is on the way as well.


### So, Where Is It?

All of these changes is happening [this branch](https://github.com/hoch/WAAX/tree/0.0.1-alpha) at the time of writing and I am completely open to any opinion or idea as well. Feel free to ping me!

### What's Next?

I will be posting a series of articles regarding the points above. They are going to be:

- Setup and Work flow: WAAX Development
- Designing custom plug-in for WAAX
- How to create custom MUI elements
- Spec Proposal: WAPL, Web Audio Plug-in Format
