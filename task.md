# Task List - Yatrasiri Travels Mobile & Layout Refinements

- [x] Modify styling (`index.css`)
  - [x] Hide the SVG map wrapper `.svg-map-wrapper` on mobile devices (`max-width: 768px`)
  - [x] Reduce padding and gap on mobile `.journey-map-panel` to format it as a compact floating label
  - [x] Fix planner overlapping: Set `.planner-form-container` to static/relative positioning by default on mobile views
  - [x] Fix monitor elements positioning: Set `.planner-form-container` to sticky only on min-width 992px, and set `align-self: start;` for correct CSS grid sticky behavior
  - [x] Set `.planner-layout` grid to `align-items: start;` on monitor view to align columns properly
- [x] Verify the application works
  - [x] Test the restarted background python server on `http://localhost:8080`
  - [x] Verify JS, CSS, and HTML syntaxes are fully correct
  - [x] Confirm scrollytelling stickiness works and the map is hidden on mobile views
  - [x] Confirm the trip planner form moves naturally on mobile scroll (no overlaps) and floats correctly on monitor views
