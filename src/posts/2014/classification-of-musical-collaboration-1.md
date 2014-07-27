---
title: "Classification of Musical Collaboration (1)"
date: 2014-06-01 00:00
tags: ['collaborative music']
template: post
---

With the definition of music being _“time-based art,”_ it is more sensible to categorize different types of collaboration based on the usage of time over participating musicians.

My argument starts with two archetypes of musical collaboration:

1. __Sequential mechanism__
2. __Time-sharing mechanism__

The sequential method has been popular and widely used. Without the computer-supported system, it was the only solution for musicians to work together remotely. Its inefficiency due to the physical constraints such as time and place makes it hard for them to iterate and reflect: only one artist can work on the material at any given moment, and also it is difficult to revert a completed step.

The time-sharing method, which offers real-time interactivity, is considered a natural solution for remote collaboration and few solutions have been built around the idea in recent years. However, none of them actually succeeded to pave the way to the mainstream. The followings are relatively well-known products:

- [Steinberg's VSTConnect][2]
- [Ohm Studio][3]
- [Avid Everywhere][1]

There are fundamental reasons behind the failure and here is the most important one:

Making music through the online collaboration is quite different than editing a spreadsheet together. Most of online collaboration platforms are geared toward _problem-solving_ as we have seen in general-purpose collaboration tools, however, music creation is far from a monotonic problem solving process. It is involved with creativity. [Holland](http://mcl.open.ac.uk/sh) defines music making as a [__problem-seeking__][5] process and I am favorable to the concept. Its focus should be discovery and exploration, rather than arriving at a goal through the unified context.

In most cases, we observe the superficial adoption of online collaboration technologies upon the conventional music production. Although I agree with the fact that the time-sharing mechanism is a critical element that encourages instant cooperation, I want to argue that the overall architecture of platform should be redesigned from scratch. (I will elaborate more on this in future posts.)

A quote from myself:

> Using DropBox or Google Drive for your music project folder means that you are using the cloud technology within the sequential paradigm. That is rather _collective_ than collaborative. To be a genuine collaborative platform, user  interaction should be the integral part of creative process, not the peripheral one.

To conclude, the first and foremost milestone of implementation is to have a complete time-sharing mechanism. It is because such system is capable of the both sequential and time-sharing methods without extra cost. Being able to work alone still matters to the majority of musicians. At the same time, the new prototype should extend the boundary of platform toward the collaborative space.

__NOTE__: The time-sharing mechanism for online collaboration is largely based on [_operational transformation_][4] algorithm. It is used to synchronize the state and data between multiple clients and many cloud platforms operate based on the variations of this technology.

[1]: http://apps.avid.com/avid-everywhere/mission/
[2]: http://www.steinberg.net/en/products/vst/vst_connect/
[3]: http://www.ohmstudio.com/
[4]: http://www.codecommit.com/blog/java/understanding-and-applying-operational-transformation
[5]: http://mcl.open.ac.uk/sh/uploads/Artificial%20Intelligence%20MusicEd.pdf