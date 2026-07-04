# Walkthrough - Custom Clip-Path Sweep Transitions (Alethia Earth)

We have refactored the scrollytelling background transitions of **Yatrasiri Travels** to feature custom clip-path portal reveals:

## Accomplishments

### 1. GPU-Accelerated Sweeping Portal Transitions
Replaced fades, sliders, and focus blurs with a circular mask sweep modeled after **Alethia Earth**:
- **Drifting Portal Entry**: As a stop approaches, its landscape image materializes inside a circular portal mask starting at the left side of the screen (`cx: 20%`) with `radius: 0%`.
- **Horizontal Sweep Reveal**: As you scroll towards the stop center, the portal sweeps to the center (`cx: 50%`) and expands to cover the entire screen (`radius: 120%`), showing the landscape photo at full size.
- **Drifting Portal Exit**: As you scroll past the stop, the image shrinks back into a circular bubble drifting to the right (`cx: 80%`) and closes to `radius: 0%`.
- **Parallel Realities**: When transitioning between two stops, the outgoing stop and incoming stop display as two separate circular window bubbles moving side-by-side, avoiding overlapping double exposure.

### 2. Styling Preserved
- Kept the enlarged **340px SVG Map of India progress tracker**, navigation layout, typography, and green/blue glassmorphism theme exactly identical.

## Verification
* **HTML Structure**: Verified zero tag mismatches.
* **CSS Structure**: Verified zero brace mismatches.
* **JS Code**: Compiled cleanly with zero warnings.
* **Server**: Verified serving at `http://localhost:8080/index.html`.
