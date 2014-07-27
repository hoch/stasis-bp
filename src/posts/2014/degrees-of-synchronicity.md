---
title: "Degree of Synchronicity"
date: 2014-06-12 00:00
tags: ['collaborative music']
template: post
---

Whenever people hear that I am working on a new platform for collaborative music making, they come up with the very same question: _"So, how are you going to synchronize all the people in the system?"_

Don't we all fancy the word _synchronization_ these days? We abuse the word 'synchronization' in numerous ways. In this case, however, we are in the context of music making which requires a more specific definition on the term. So I usually answer with a question: _"What is the degree of synchronization are you talking about?"_

And this article serves its purpose as the long version of the answer that I had in my mind for a while.


### Music: More Emphasis on Time

More than 20 years ago, Johnson-Lenz nicely defined a matrix of time and space that has been considered as the ultimate principle of classifying collaborative system. Based on this idea, I thought the time axis of the matrix can be zoomed in with the help of contemporary technologies for collaboration. <small>(1)</small>

![Time and Space Matrix]({@assets}/synchronicity-0.png)

When musicians talk about the synchronization, they tend to assume the perfect real-time setting. However, to the population who cares about sharing documents, the asynchronous setting might be good enough. The gap between those two ends of synchronicity is substantial. I believe there are at least 5 levels of synchronicity and we need to see the whole as a continuum of synchronicity.

![Degree of Synchronicity]({@assets}/synchronicity-1.png)

Here is the big picture currently I have. The _target implementation_ is the coverage of prototype that I am trying to build. You can see the left end of axis is not included in the coverage. The next section will explain why this is the case.


### Is Real-time Always Better?

A complete _real-time_ mechanism might look like the best fit for musical collaboration, but it has clear disadvantages. The most critical factor is the rigid constraint on the time frame of interaction between users. They need to be ready and willing to work together at a given moment. Also the delay caused by the network will not be tolerated by participants. 

For these two reasons, the most effective solution for real-time collaboration is simply working together at the same place and time. The Laptop Orchestra project is a good example. However, it does not utilize the collaborative technologies - it is just a plain _synchronous/collocated_ collaboration.

The _near real-time_ model has been widely used in the field of networked music performance. In general, the music performance requires the high degree of time precision and we are still facing unsolvable issues such as the latency in networks and the rareness of infrastructure. 

However, I look at this issue from a different perspective: __What if we focus on the production, not the performance?__ 

The collaborative production with high synchronicity is a clear win. Note that it does not mean we always have to synchronize everything at its maximum capacity. Higher synchronicity allows us to synchronize as needed without noticeable discontinuity. In addition, the near real-time system can be transformed into the others (shared-state, asynchronous) by simply lowering the frequency of synchronization.

Cloud-based sync services such as _Google Drive_ or _Dropbox_ provide users with the adequate level of synchronization for general purpose. Despite the fact that the adjective "near real-time" is used by the majority of service providers, I believe it is not appropriate in the musical setting. That is why I made up the term __shared-state__ in the diagram above. 

They might synchronize the documents in a near real-time fashion, but the environment does not provide [_awareness_][2] on other users activity. Web-apps in Google Drive surely offer awareness by displaying cursor and selection of other users, but the client version of Google Drive synchronization does not work that way.

In this classification scheme, I am considering the stand-alone system as the lowest end of synchronicity, which means zero synchronicity. Some music collaborations actually do have zero synchronicity. Remixing, remaking or mash-ups such as [Eric Whitacre's Virtual Choir][3] and [Johnny Cash Project][4] can be good examples for this. Unfortunately I do not see it as a _collaboration_ based on my foundation of research. This type of work is more of _collective effort_ or _orchestrated correspondence_ with a maintained context. There is no sense of live awareness here.


### Synchronicity != Real-time

In online music collaboration, synchronicity is everything. The system needs to embrace the different degrees of synchronicity and the near real-time model covers almost everything except for the perfect real-time mechanism. Also being able to offer a variety of collaboration patterns allows musicians to improvise swiftly or digest slowly based on the preference.

I realized the real problem is to fight the inconsistent definition of terms. The term _synchronous_ from the software engineering cannot be equated to the term _real-time_ in a musical sense.


---
#### References

1. Johnson-Lenz, Peter, and Trudy Johnson-Lenz. _"Consider the groupware: Design and group process impacts on communication in the electronic medium."_ Studies of Computer-Mediated Communications Systems: A Synthesis of the Findings 16 (1981).



[1]: http://www.aiim.org/article-docrep.asp?ID=32715 "Enterprise Content Management, Bob Violino"
[2]: http://en.wikipedia.org/wiki/Collaborative_information_seeking#Awareness
[3]: https://www.youtube.com/watch?v=D7o7BrlbaDs
[4]: http://www.thejohnnycashproject.com/