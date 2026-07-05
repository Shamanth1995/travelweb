# Task List - Yatrasiri Travels Date Pickers & Toasts

- [x] Modify layout (`index.html`)
  - [x] Add `#toast-container` overlay container before the closing `</body>` tag
- [x] Modify styling (`index.css`)
  - [x] Style `input[type="date"]` with `color-scheme: dark;` for native dark popups
  - [x] Style `input[type="date"]::-webkit-calendar-picker-indicator` with teal CSS filters
  - [x] Add rules for `.toast-container` and `.toast-alert` matching the green/blue glassmorphism theme
- [x] Modify logic (`index.js`)
  - [x] Bind keydown listeners to `#start-date` and `#end-date` to call `event.preventDefault()`
  - [x] Bind click listeners to `#start-date` and `#end-date` to call `inputElement.showPicker()`
  - [x] Create `showToast(message)` function with a slide-in and 5-second fade-out timer
  - [x] Replace standard `alert()` dialogs in the trip planner submit handler with `showToast(...)`
- [x] Verify the application works
  - [x] Test typing inside date fields (verify blocked)
  - [x] Click fields (verify dark-themed calendar opens)
  - [x] Submit a trip of > 10 days (verify custom toast alert slides in, stays 5 seconds, and fades out cleanly)
