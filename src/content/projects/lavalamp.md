---
title: Lava Lamp
order: 1.6
stack: [WebGPU, TypeScript, WGSL]
links:
  - label: "Live demo (requires WebGPU)"
    url: https://aherriot.github.io/lavalamp/
  - label: github.com/aherriot/lavalamp
    url: https://github.com/aherriot/lavalamp
summary: A fully raymarched, GPU-simulated lava lamp built from scratch in raw WebGPU and WGSL shaders — no rendering library, no mesh, no engine.
---

[Live demo →](https://aherriot.github.io/lavalamp/) (requires a [WebGPU-capable browser](https://caniuse.com/webgpu) — recent Chrome/Edge, Safari 18+, or Firefox with WebGPU enabled)

![Lava lamp render](/static/lavalamp.png)

A fully raymarched, GPU-simulated lava lamp, built from scratch in WebGPU and TypeScript with zero rendering libraries — no three.js, no engine, just raw WGSL shaders talking directly to the GPU.

Nothing in the scene is a triangle mesh. The glass, the wax, and the metal base are all **signed distance functions (SDFs)** — pure math describing how far a point is from the nearest surface — rendered by **raymarching**: walking a ray outward from the camera one safe step at a time until it hits something. That single technique is what makes the whole scene possible:

* The wax blobs merge and separate like real fluid using a smooth-minimum blend between multiple sphere SDFs — no particle system, no mesh deformation, just blending distance values.
* The physics simulation runs entirely on the GPU, in a WGSL compute shader — buoyancy, wall repulsion, and blob-blob repulsion are all computed in parallel every frame, never touching the CPU.
* The glass container fakes refraction and Fresnel reflectivity (the way real glass gets more mirror-like at grazing angles) without ever bending a ray — a cheap trick that looks convincingly real.
* Bloom, height-based lava coloring, and a metallic base are additional shader passes and SDF primitives layered on top of the same core raymarching loop.
* The blob count is live-adjustable (1–24) via an on-screen GUI, which requires actually recompiling the WGSL shader on the fly, since WGSL array sizes and workgroup sizes have to be known at compile time.

Everything — camera, lighting, container, simulation — was built incrementally from first principles, starting from a blank canvas and a single hardcoded triangle: rasterization → SDFs → compute shaders → raymarching → lighting → post-processing.

Built with TypeScript + Vite, raw WebGPU (no rendering library), and Tweakpane for the tuning UI.
