---
title: Auto-Charcuterie
order: 1.52
stack: [WebGPU, Physics, Next.js, TypeScript]
links:
  - label: autocharcuterie.vercel.app
    url: https://autocharcuterie.vercel.app
  - label: github.com/aherriot/auto-charcuterie
    url: https://github.com/aherriot/auto-charcuterie
summary: A 3D charcuterie board builder where physics decides where your food lands and two opinionated judges score the result — hand-written WebGPU renderer, no models, no textures, no rendering library.
---

[Play it →](https://autocharcuterie.vercel.app) (requires a [WebGPU-capable browser](https://caniuse.com/webgpu) — recent Chrome/Edge, Safari 18+, or Firefox with WebGPU enabled)

Build a charcuterie board in 3D: click an item, click a spot above the board, and drop it. Physics decides where it actually lands. Two judges heckle you throughout, then score you out of 100 and hand you the bill.

![The board scene: a wooden cutting board with cheese wedges, salami, cornichons and breadsticks scattered across it, a live selections menu on the right, and the judges heckling on the left](/static/auto-charcuterie-board.jpg)

Everything visible is generated at runtime from math. There are no 3D models, no image textures, and no rendering library — just **WebGPU** and hand-written WGSL.

### A renderer built from scratch

No three.js, no Babylon. Pipelines, camera, lighting, shadows and the material system are all hand-built: Cook-Torrance GGX specular over Lambert diffuse, one directional key light with a hemispheric ambient term, a 2048² shadow map with 3×3 PCF filtering, and an ACES-style tonemap.

Dropping the rendering library means the renderer can quietly expand to fill the whole project, so the fidelity ceiling is fixed in writing up front — stylized PBR with soft shadows, and explicitly no image-based lighting, no SSAO, no depth of field, no bloom.

Every mesh is procedural: superellipsoids, swept béziers and lofted polygons, each food generated from parameters with seeded per-instance jitter so no two salami rounds are identical. The textures are procedural too, written in WGSL — fBm marbling for the salami, Voronoi cells for holed cheese, ring-based wood grain for the board. No asset pipeline, no licensing questions, no bundle weight.

### Physics, including the part that didn't exist

Rigid bodies run on Rapier at a fixed timestep with an accumulator, so behaviour is identical on a 60Hz and a 120Hz display.

But draping is what makes a charcuterie board read as real, and Rapier has no soft bodies or cloth — deformables simply aren't in the engine. So the slices are **XPBD cloth solved in a WGSL compute shader**: particle positions live in GPU storage buffers, a compute pass solves distance and bending constraints, and the vertex stage reads that same buffer directly. No CPU readback anywhere in the render path.

Getting it to hold up took solving several failures that only appear once it's running — edges tested as segments rather than points so obstacles stop slipping through a coarse grid, swept collision tests against the previous position to stop tunnelling at low framerates, a spatial hash rebuilt every substep for slice-vs-slice contact, and per-slice sleeping because XPBD never quite reaches equilibrium and a stack will shimmer forever.

The counter-intuitive result: a *coarse* grid solved very hard beats a fine grid solved lightly. Once edge-based collision decoupled visual fidelity from grid resolution, extra particles bought nothing, and spending that budget on solver iterations instead is what makes a drape hold its shape.

WebGPU also guarantees only 8 storage buffers per shader stage, and plenty of mobile hardware stops exactly there. Raising the limit would silently narrow the pool of devices that can run it, so related data gets packed into shared allocations instead — bucket counts and bucket contents share one buffer, as do per-slice energy and quiet-frame counters.

### Judged by algorithm, not by a model

![The results card: two judges each score 39, next to an itemised bill totalling $21.20](/static/auto-charcuterie-results.jpg)

There's no LLM anywhere in the judging — that's the point. Both scores are deterministic functions of a plain snapshot of the board.

One judge grades aesthetics from pure geometry: coverage, colour variance, spatial entropy and height variation, minus same-item clustering, edge crowding and anything that fell on the floor. The other grades the food from a hand-authored pairing matrix over all 16 items, plus category balance, repetition penalties and value-for-money. Fig and blue score. Prosciutto and grapes score. Cornichons and honeycomb do not.

Pairings only count if the two items actually landed near each other, which ties the two judges' axes together and rewards placement rather than shopping. Commentary is event-driven over weighted templates, with a no-repeat ring buffer and idle heckling so the board is never silent for long.

The architecture has one hard rule enforcing this: the game logic never imports from the engine. Scoring and dialogue see only a plain `BoardSnapshot` — ids, positions, radii, colours — and no GPU types, Rapier types or React. That boundary is why the entire judging system, the thing most worth iterating on, runs under `node --test` in under a second instead of needing a browser and a GPU to tune a pairing matrix.

Built with **Next.js** 16 and **TypeScript**, where React handles only the UI shell and never touches the render loop. The full dependency list is five entries: Next, React, Rapier, a matrix math library, and WebGPU type definitions.
