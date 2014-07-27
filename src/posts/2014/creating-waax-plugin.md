---
title: Creating WAAX plug-in
date: 2014-07-15 15:07
tags: ["WAAX","Web Audio","JavaScript"]
template: post
---

> NOTE: I am currently building up the documentation for the new version of WAAX and this article is a part of the series. Some references from this article might not exist at the time of writing.


With the version 1.0.0, WAAX introduced the __plug-in system__. It was my intention to support some sorts of plug-in mechanism from the inception of WAAX project. Previous iterations of WAAX deployed the term _Unit_ for modular audio processing or sound synthesis. However, I am changing it to "plug-in" which is more common in computer music.

If you are not familiar with the concept of plug-in in music production, I recommend you to read these resources first.

- [Audio Plug-in, Wikipedia](http://en.wikipedia.org/wiki/Audio_plugin) 
- [Introductory Article, TutsPlus.com](http://music.tutsplus.com/tutorials/beginners-introduction-to-composing-on-the-computer-software--audio-19607)
- [Plug-ins for Audio, Tweakheadz.com](http://tweakheadz.com/plugins-for-audio/)


### Overview: Generator, Processor and Analyzer

WAAX currently defines 3 types of plug-in: __Generator__, __Process__ and __Analyzer__. They have different configuration in terms of the internal audio routing. Note that the encapsulation is made possible by a predefined set of gain nodes. The following diagrams show how internal nodes are connected.

![WAAX Plug-in Types]({@assets}/waax-plugin-0.png)

The examples of each plug-in type are:

- Generator: a synthesizer or sampler.
- Processor: an effect unit such as compressor, delay, distortion or reverb.
- Analyzer: a special unit for visualization, metering and event generation.

Blackboxes above are to be filled in by a developer. All other stuffs - preset/parameter management, two-way binding, standardized input/output and more - will be managed by WAAX.


### Parameter and Handler

WAAX's parameter handling mechanism was designed with special care, because parameter control means almost everything in computer music. WAAX simplifies the parameter management with several neat ideas.

A WAAX Plug-in has its own preset layer. When you define a parameter in a plug-in, the parameter is included in the plug-in preset and you are required to write a handler for the parameter. Once it is set up, changing the parameter value automatically triggers the corresponding handler to perform scaling and "one-to-many" mapping.

![WAAX Plug-in Types]({@assets}/waax-plugin-1.png)

With this mechanism, you can have an abstract preset (a collection of WAAX parameters) which can be mapped into multiple AudioParam instances in a flexible fashion.

The handler is a quite powerful tool especially when you want to use __MUI elements__ (i.e. knobs, sliders and etc.) for parameter control. You can get two-way binding between a parameter and a GUI element with a single line of code. (See the article on [MUI]() for detail.)


### Building WAAX Plug-in

This section shows the anatomy of plug-in building procedure. Before jumping right into the code example, here is the summary of each step:

1. Create IIFE encapsulation and define a class
2. Write the class constructor
    + Define plug-in type
    + Do your stuff: node creation/patching and etc.
    + Define WAAX Parameters
    + Initialize Preset
3. Write the class prototype
    + Write plug-in info
    + Write plug-in default preset
    + Write handler methods for WAAX parameters defined above
4. Wrapping up
    + Extend the prototype with predefined plug-in types
    + Register the plug-in under WX namespace.

It might be too much to digest at a glance, but it is nothing more than defining a JavaScript class.


#### 1. IIFE Encapsulation and Class Definition

~~~js
// plug-in boiler plate
(function (WX) {

  // plug-in constructor
  function MyPlugin(preset) {}

  // prototype
  MyPlugin.prototype = {};

})(WX);
~~~

The above snippet is a fundamental scaffolding of WAAX plug-in. For the safe encapsulation, Using [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression) is strongly recommended. Other than that, it is a plain JavaScript class definition. For the next step, the constructor needs to be filled in.


#### 2. Plug-in Constructor

~~~js
function MyPlugin(preset) {

  // 1. define plug-in type
  WX.Plugin.defineType(this, 'Processor');

  // 2. create and patch native nodes
  this._input.to(this._output);

  // 3. define WAAX parameters
  WX.defineParams(this, { 
    sweet: {
      type: 'Boolean', default: false
    },
  });

  // 4. initialize preset
  WX.Plugin.initPreset(this, preset);

}
~~~

Among the steps shown above, 1, 3 and 4 are mandatory for the plug-in to run properly. The most important thing is the step 1 because it creates the internal routing so you can input or output sound. In the current version (1.0.0), you can choose one plug-in type from _Generator, Processor and Analyzer_.

Step 3 is to define WAAX parameters and note that you need to define the corresponding handler in the prototype.


#### 3. Plug-in Prototype

~~~js
MyPlugin.prototype = {

  // 1: plug-in info
  info: {
    name: 'MyPlugin',
    api_version: '1.0.0-alpha',
    plugin_version: '1.0.0',
    author: 'hoch',
    type: 'Processor',
    description: 'Dummy Plug-in'
  },

  // 2: default preset
  defaultPreset: {
    sweet: false
  },

  // 3: define handlers
  $sweet: function (value, time, xtype) {
    // do something when parameter 'sweet' changed
  }
};
~~~

A plug-in prototype is consist of __plug-in information__, __default preset__ and __handlers__: filling the info and default preset should be straightforward. Writing handlers is not difficult if you have a solid idea on how to scale and map parameters.

The detail on parameter definition and writing handler is covered in [this article]().


#### 4. Wrapping Up

~~~js
WX.Plugin.extendPrototype(MyPlugin, 'Processor');
WX.Plugin.register(MyPlugin);
~~~

Easy! Just copy and paste two lines above and replace the constructor name and the plug-in type accordingly.


### How to use

Load your plug-in script file after WAAX core library. Then you can use it under WX namespace.

~~~html
<script src="waax.min.js"></script>
<script src="MyPlugin.js"></script>
<script>
  var myplugin = WX.MyPlugin({ mute: false });
  myplugin.to(WX.Master);
</script>
~~~

That's it for now! More articles on the usage and code examples will follow!

