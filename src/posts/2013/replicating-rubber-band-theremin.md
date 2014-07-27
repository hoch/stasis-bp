---
title: "From Theremin to Leap Motion"
date: 2013-04-24 20:50
tags: [gesture]
template: post
draft: true
---

### The Rubber Band Theremin

[John Granzow][1] and I are currently designing an experiment about the perceptual enhancement on the gesture-based input system. This is a continuation of my research on improving gesture user interface with auditory feedback, and also a super-fun follow up on ["the rubber band theremin" by Sile O'Modhrain and Chris Chafe.][2]

Here's the quote of the anecdote:

_By happy accident, we discovered that coupling the player's hand to the instrument's antenna via a simple elastic band made it much easier to control. This lead us to hypothesize that the increases and decreases in tension in the elastic band were providing additional feedback that was somehow making it easier to judge the amplitude of changes in the control parameter._

I knew about this even before I came to CCRMA; I remember my mentor Prof. Jun Kim told me about this once but it did not resonate my world back then. However, this interesting finding came out of the blue in a lunch meeting with John and suddenly it was a stroke of lightning on me. This epiphany was surely because I have been pushing the idea of "gesture with audio" as my doctoral research topic.

The finding itself, however, does not have a direct connection to my idea. Actually I believe using the elastic band partially defeats the purpose of playing a theremin because it physically restrains the movement of a hand. The restraint is about losing the freedom at the expense of the accuracy. My question lies at this particular point; why is this restraint beneficial to the accuracy of the performance?

So here are my hypotheses.

### Hypotheses

1. A point of reference: the tactile feedback has an implicit nature of the "contact" which can play a crucial role as a point of reference. All of gesture interaction methods lacks this critical sense. Without the understanding the deficiency or importance of the haptic quality in the system, designing a gesture-based interface can never be completed.

2. Applying multi-modality to the elastic band: can the elastic band be replaced with other senses? In other words, the sense of "having a reference point" can be substituted with other modality such as audiovisual feedback? To be precise, can the auditory feedback provide a context which is handy to users by informing them about what they are doing?

### Experiment Design

To establish the ground truth of these questions, John and I designed the pilot experiment:

#### Experiment Platform

A MacBook Air, A Leap Motion, Chrome Web Browser

#### Visual Feedback

A vertical slider. The subject will be asked to move the handle of the slider to a certain position. The interactive graphic will provide user with the feedback. When the subject put or remove a hand from the detector, the color of the slider handle will be changed accordingly.

#### Audio Feedback

An oscillator with a reasonable frequency range. As the subject moves her or his hand vertically on the detector, the pitch of the oscillator will be changed accordingly. Sampled sounds will be played when the subject put or remove a hand from the detector to provide the onset or release.

#### Haptic Feedback

A platform will be crafted in a way that the subject put her or his hand into an elastic band to restrain the wrist. Depending on the type of stimuli, the subject will be asked to use or not to use the band.

### Stimuli

1. Visual
2. Audio + Visual
3. Visual + Haptic
4. Visual + Audio + Haptic


[1]: https://ccrma.stanford.edu/~granzow/
[2]: https://ccrma.stanford.edu/~cc/misc-papers/isora2000.ps