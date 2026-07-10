---
title: ReadTrip
layout: default
order: 0
---

[readtripapp.vercel.app](https://readtripapp.vercel.app/)

ReadTrip is a curiosity engine for kids (ages ~5–12) that turns "why is the sky blue?" into a guided learning session. A child picks any topic — or one from a dynamically generated map of branches — and the app produces a kid-friendly explanation at exactly their reading level, checks understanding with a short quiz, rewards the effort with points and badges, and lets the child steer where to explore next. The same product spans early readers and tweens by adapting reading level rather than shipping separate apps.

![ReadTrip topic map](/static/readtrip-topics.jpg)

The core loop — Calibrate → Explore → Read → Quiz → Reward → Steer — repeats as the child jumps from topic to topic, with a one-time calibration mini-game setting a starting reading level that then continuously refines itself from quiz results.

![ReadTrip lesson](/static/readtrip-story.jpg)

![ReadTrip quiz](/static/readtrip-quiz.jpg)

A few things made this one fun to build:

* **The design system.** Every screen leans into a hand-drawn notebook-paper aesthetic — sketchy borders, a wordmark that looks hand-lettered, sticky-note topic cards, a torn-paper texture underneath it all. It's playful and distinctly "for kids" without tipping into clutter, and it's a real component library (buttons, inputs, modals, progress bars) with visual regression tests, not just one-off styling.
* **Adaptive difficulty.** Reading levels vary wildly between kids, so getting the starting point and the ongoing adjustment right is a real calibration and online-adaptation problem, not a prompt trick.
* **Model routing + prompt caching.** Generation is routed across Haiku/Sonnet/Opus by task, with stable system prompts cached, to keep cost and latency low even as content is generated at scale.
* **Evals, not vibes.** Reading-level accuracy, quiz quality, and factual grounding are measured by a versioned eval harness rather than assumed to work.
* **Child safety, end to end.** Since this is a product for children, every path that generates or surfaces content — explore, lesson, quiz, and world-map suggestions — is guarded by layered, defense-in-depth checks: a deterministic rules layer, a Haiku classifier, guarded system prompts, and an output scan that runs server-side on everything the model produces. A blocked topic gets a warm redirect, never a cold error.

Built with Next.js (App Router), TypeScript, and the Claude API for all generation.

### links

[readtripapp.vercel.app](https://readtripapp.vercel.app/)

[github.com/aherriot/readtrip](https://github.com/aherriot/readtrip)
