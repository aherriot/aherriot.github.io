---
title: GPX Trail Viewer
order: 1.55
stack: [C++]
links:
  - label: github.com/aherriot/gpx-trail-viewer
    url: https://github.com/aherriot/gpx-trail-viewer
summary: A desktop app that opens any .gpx trail export and shows the route on an interactive map alongside the raw track points and an elevation/speed profile.
---

GPX Trail Viewer is a small desktop app that opens a `.gpx` file — the standard export format from Strava, Garmin, Apple Health/Fitness, Komoot, and pretty much every GPS watch or fitness app — and shows the route on an interactive map, alongside the raw track points and an elevation/speed profile.

![GPX Trail Viewer showing a bike ride along the Ottawa River, with the table, map, and elevation chart all visible](/static/gpx-trail-viewer-screenshot.jpg)

It's a compact way to touch three different, genuinely useful skills at once:

* **C++.** Parsing an XML file by hand with `QXmlStreamReader`, modeling the data as a plain `std::vector<GpxPoint>`, and implementing real geospatial math (the Haversine formula for great-circle distance between lat/lon pairs).
* **Qt.** A `QMainWindow` app combining Widgets (table view, menus, dialogs), Qt Location/QML (the interactive map, embedded in a Widgets app via `QQuickWidget`), and Qt Charts (the profile chart) — three different Qt technologies that don't normally get used together, each with its own quirks.
* **Geospatial + real-world data.** Because it reads standard GPX, it isn't limited to synthetic test data — export any activity from Strava, Garmin Connect, Apple Health, or a GPS watch and open it directly. Real tracks expose real problems (missing elevation, missing timestamps, noisy GPS data) that a toy dataset never would.

Features include a sortable track-point table, an interactive OpenStreetMap-tiled map with full pan/zoom support, elevation and speed profile charts, and graceful handling of incomplete data (elevation and timestamps are optional per the GPX spec).

Speed isn't in the GPX file — it's derived per segment as distance/time between consecutive points, which is very sensitive to GPS noise. The chart handles this by rejecting implausible samples (segments under a second, or speeds above 120 km/h) and smoothing the rest with a 5-point centered moving average, so real speed changes stay visible without the noise.
