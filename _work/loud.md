---
title: LOUD Technologies
layout: default
order: 4
---

## 2012 to 2013

Previously, I worked for LOUD Technologies, a concert speaker company, on software used to control speakers called EAW Resolution. The software was a combination of a venue CAD modeling tool with speaker configuration and control. I worked in a team of three people doing a bit of everything, from front end GUI (Using Qt and OpenGl) to multi-threaded network programming and data simulation and modeling.

It is difficult to show the work that I did in screenshots for the simulation and multi-threaded networking, but at least you can get a sense of the front end work that I did and the scope of the software. The first screenshot shows UVic Farquhar Auditorium modeled in the software. In the centre, you can see 6 speakers hung the software calculates the optimal position and setup for this hang position and shows the decibel level heatmap for the seating in the concert.

![EAW Resolution Screenshot 1](/static/loud-screenshot1.png){:class="screenshot"}

The second picture shows a stadium model with several flown speaker arrays as well as subwoovers and fill speakers on the ground. The Frequency Response modal window shows the loudness at each of the circles on the arena field across the audible sound frequencies. This lets the sound engineer fine tune the speaker setup so that the concert sounds good for every location and every sound frequency.

![EAW Resolution Screenshot 2](/static/loud-screenshot2.png){:class="screenshot"}

Finally, we have a screen showing an equalizer window, where you can adjust the sound for either an individual speaker or a whole array. If for example, if the higher frequencies were falling off, you can increase them to achieve a more level sound.

![EAW Resolution Screenshot 3](/static/loud-screenshot3.png){:class="screenshot"}

Other work that I did involved geometry calculations for finding the ideal placement and settings for speakers in three dimensions. I did a fair bit of network programming to check the status of the speakers for amp temperatures, and other errors. Also, I created a firmware update manager which sent new versions to the speakers.
