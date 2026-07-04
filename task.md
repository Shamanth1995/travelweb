# Task List - Yatrasiri Travels Clip-Path Sweep Transitions

- [x] Modify styling (`index.css`)
  - [x] Set `.canvas-layer` default properties for clip-path masking
  - [x] Set `clip-path: circle(0% at 50% 50%)` as the default state
  - [x] Remove legacy blur filters and translation transforms
  - [x] Ensure all layout panels, colors, and SVG properties remain identical
- [x] Modify logic (`index.js`)
  - [x] Update `updateScrollytelling3D` scroll listener
  - [x] Calculate relative stop progress coordinate $x \in [-1, 1]$
  - [x] Calculate mask radius: $(1.0 - |x|) \times 120$ (bell curve peaking at 120%)
  - [x] Calculate mask center X: $50 + x \times 30$ (sweeps left-to-right from 20% to 80%)
  - [x] Apply `clip-path: circle(radius% at cx% 50%)` dynamically on scroll
  - [x] Control performance by setting `opacity: 0` for layers outside the view window ($|x| \ge 1.0$)
- [x] Verify the application works
  - [x] Test the local server output
  - [x] Verify that background images materialize and sweep organically across the screen via clip-path
  - [x] Confirm no changes were made to styling theme or map details
