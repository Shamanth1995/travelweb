document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation & Active Link Highlight ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });


  // --- 2. Mobile Responsive Navigation Drawer ---
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileNavToggle && navLinksContainer) {
    mobileNavToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileNavToggle.querySelector('i');
      if (navLinksContainer.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }


  // --- 3. Alethia Earth Inspired SVG Map Progress & Clip-Path Sweeping Portal ---
  const scrollerContainer = document.getElementById('journey');
  const stickyContainer = document.getElementById('journey-sticky');
  const canvasLayers = document.querySelectorAll('.canvas-layer');
  
  // Coordinates database for the 7 stops (used for labels only)
  const stopTitles = [
    "Munnar Highland",
    "Hampi Boulders",
    "Varkala Coast",
    "Gandikota Canyon",
    "Coorg Coffee Trail",
    "Ooty Mountain Pass",
    "Jog Falls"
  ];

  // Map route limits: Start (Munnar) and End (Jog Falls) SVG coordinates
  const startCoord = { x: 138, y: 305 };
  const endCoord = { x: 112, y: 240 };

  function updateScrollytelling3D(totalProgress) {
    if (!stickyContainer) return;

    // Calculate active stop index (1-7)
    const activeIndex = Math.min(7, Math.max(1, Math.round(totalProgress * 6) + 1));
    stickyContainer.setAttribute('data-active-stop', activeIndex);

    // --- 3.1 Background Image Clip-Path Sweeping Portal Transition ---
    for (let i = 1; i <= 7; i++) {
      const layer = canvasLayers[i - 1];
      if (!layer) continue;

      // Relative index coordinate relative to stop center (-1 to 1)
      const x = (totalProgress * 6) - (i - 1);

      if (Math.abs(x) < 1.0) {
        layer.classList.add('active');
        layer.style.opacity = 0.9; // Constant solid opacity to avoid overlapping double exposure

        // Mask Radius: Grows from 0% at edge to 120% (fills screen) at center
        const radius = (1.0 - Math.abs(x)) * 120;
        
        // Center X coordinate: sweeps horizontally from 20% to 80%
        const cx = 50 + x * 30;

        // Apply circular clip-path mask
        layer.style.clipPath = `circle(${radius.toFixed(1)}% at ${cx.toFixed(1)}% 50%)`;
      } else {
        layer.classList.remove('active');
        layer.style.opacity = 0;
        // Position closed bubble at edges (20% for future stops, 80% for past stops)
        layer.style.clipPath = `circle(0% at ${x < 0 ? 20 : 80}% 50%)`;
      }
    }

    // --- 3.2 Floating Vector Map Progress Interpolation (Start and End Only) ---
    // Interpolate pointer position along the single direct route line
    const currentX = startCoord.x + (endCoord.x - startCoord.x) * totalProgress;
    const currentY = startCoord.y + (endCoord.y - startCoord.y) * totalProgress;

    const mapPointer = document.getElementById('map-pointer');
    if (mapPointer) {
      mapPointer.setAttribute('cx', currentX.toFixed(1));
      mapPointer.setAttribute('cy', currentY.toFixed(1));
    }

    // Update active node highlights (Start node is always active, End node lights up at 100% scroll)
    const startNode = document.querySelector('[data-map-stop="start"]');
    const endNode = document.querySelector('[data-map-stop="end"]');
    
    if (startNode) startNode.classList.add('active');
    if (endNode) {
      if (totalProgress >= 0.98) {
        endNode.classList.add('active');
      } else {
        endNode.classList.remove('active');
      }
    }

    // Update floating map header labels
    const mapTitle = document.getElementById('map-stop-title');
    const mapIndex = document.getElementById('map-stop-index');
    if (mapTitle && stopTitles[activeIndex - 1]) {
      mapTitle.textContent = stopTitles[activeIndex - 1];
    }
    if (mapIndex) {
      mapIndex.textContent = `[ 0${activeIndex} // 07 ]`;
    }
  }

  // Scroll listener to calculate progress continuously
  function handleJourneyScroll() {
    if (!scrollerContainer || !stickyContainer) return;

    const scrollerTop = scrollerContainer.offsetTop;
    const scrollerHeight = scrollerContainer.clientHeight;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const startScroll = scrollerTop;
    const endScroll = scrollerTop + scrollerHeight - viewportHeight;

    if (scrollY >= startScroll && scrollY <= endScroll) {
      const totalProgress = (scrollY - startScroll) / (endScroll - startScroll);
      updateScrollytelling3D(totalProgress);
    } else if (scrollY < startScroll) {
      updateScrollytelling3D(0);
    } else if (scrollY > endScroll) {
      updateScrollytelling3D(1);
    }
  }

  // Bind scroll event
  if (scrollerContainer && stickyContainer) {
    window.addEventListener('scroll', handleJourneyScroll);
    // Initialize once
    handleJourneyScroll();
  }


  // --- 4. Interactive Dates Trip Planner Database & Logic ---
  const plannerForm = document.getElementById('trip-planner-form');
  const resultsContainer = document.getElementById('planner-results-container');
  const placeholderView = document.getElementById('placeholder-view');

  const itineraryDb = {
    kerala: {
      title: "Western Ghats & Coastal Trail",
      tags: ["Western Ghats", "Tea Estates", "Cliffs"],
      activities: {
        trekking: [
          { title: "Munnar Ridge Peak Hike", desc: "Trek to the high-altitude peaks of Munnar. Traverse cloud forests and walk along ridge trails with expert naturalists.", icon: "fa-solid fa-person-hiking" },
          { title: "Meesapulimala Peak Ascent", desc: "Trek the second highest peak in the Western Ghats. Sleep above the clouds at our exclusive campsite.", icon: "fa-solid fa-mountain" }
        ],
        beach: [
          { title: "Varkala Cliff Beach & Surf", desc: "Surfing lessons on Varkala Black Beach and walk along the red clay cliffs for sunset yoga sessions.", icon: "fa-solid fa-water" },
          { title: "Munroe Island Backwater Kayaking", desc: "Paddle through quiet, narrow canal networks shaded by coconut palms in the backwaters.", icon: "fa-solid fa-ship" }
        ],
        heritage: [
          { title: "Tea Estate & Museum Tour", desc: "Visit Munnar's historic tea museum. Learn the art of leaf processing and taste premium orthodox brews.", icon: "fa-solid fa-landmark" }
        ],
        camping: [
          { title: "Suryanelli Cloud Camping", desc: "Camp in dome tents on the ridge edge. Watch the clouds roll beneath your camp at sunrise.", icon: "fa-solid fa-tent" }
        ]
      }
    },
    karnataka: {
      title: "Deccan Boulders & Waterfalls",
      tags: ["Heritage", "Boulders", "Waterfalls"],
      activities: {
        trekking: [
          { title: "Jog Falls Canyon Gorge Exploration", desc: "Trek down the steep canyon trail of Jog Falls, standing at the base of the colossal cascades.", icon: "fa-solid fa-person-hiking" },
          { title: "Coorg Coffee Estate Hike", desc: "Trek along off-road muddy coffee trails, exploring evergreen forests and spice plantations.", icon: "fa-solid fa-leaf" }
        ],
        beach: [
          { title: "Tungabhadra Coracle Crossing", desc: "Cross the swirling Tungabhadra river in a circular, woven bamboo coracle boat to reach Hampi's Anegundi side.", icon: "fa-solid fa-ship" },
          { title: "Sanapur Lake Freshwater Swim", desc: "Relax and swim in the boulder-lined waters of Sanapur Lake, a scenic freshwater oasis.", icon: "fa-solid fa-water" }
        ],
        heritage: [
          { title: "Hampi Ruins Cycling Tour", desc: "Cycle around Hampi's ancient structures: the Stone Chariot, Virupaksha temple, and the Queen's Bath.", icon: "fa-solid fa-bicycle" }
        ],
        camping: [
          { title: "Hampi Boulders Stargazing", desc: "Set up tents on the massive rock formations. Enjoy a night of bonfire music and stargazing.", icon: "fa-solid fa-tent" },
          { title: "Coorg Forest Off-Road Camp", desc: "Camp inside a dense private forest in Coorg, listening to forest crickets under starry skies.", icon: "fa-solid fa-campground" }
        ]
      }
    },
    andhra: {
      title: "Grand Canyon & Cave Expedition",
      tags: ["Canyons", "Fortress", "Caves"],
      activities: {
        trekking: [
          { title: "Gandikota Gorge Descent", desc: "Trek down the red sandstone gorge of Gandikota to the riverbed of the Pennar River.", icon: "fa-solid fa-person-hiking" }
        ],
        beach: [
          { title: "Pennar River Kayaking", desc: "Paddle through the deep, orange sandstone canyon walls. Experience the gorge from the water.", icon: "fa-solid fa-ship" }
        ],
        heritage: [
          { title: "Belum Caves Subterranean Trail", desc: "Descend into the second largest cave system in India. Explore maze-like paths and stalactites.", icon: "fa-solid fa-gem" },
          { title: "Gandikota Fort Exploration", desc: "Explore the massive 12th-century sandstone fortress, its mosque ruins, granary, and temples.", icon: "fa-solid fa-landmark" }
        ],
        camping: [
          { title: "Canyon Edge Stargazing Camp", desc: "Pitch camp on the sheer drop of the sandstone gorge. Watch the canyon walls glow red at sunrise.", icon: "fa-solid fa-tent" }
        ]
      }
    },
    tamilnadu: {
      title: "Nilgiri Mountain Rail & Alpine Hikes",
      tags: ["Pine Forest", "Toy Train", "Alpine Lake"],
      activities: {
        trekking: [
          { title: "Doddabetta Peak Wilderness Hike", desc: "Trek to the highest point in Tamil Nadu through rhododendrons and shola forests.", icon: "fa-solid fa-person-hiking" },
          { title: "Ooty Pine Valley Forest Hike", desc: "Walk through the towering pine valleys, checking out dense woods and high-altitude lakes.", icon: "fa-solid fa-tree" }
        ],
        beach: [
          { title: "Avalanche Lake Rowboating", desc: "Rent rowboats or fish on the crystal clear waters of the high-altitude Avalanche Lake.", icon: "fa-solid fa-ship" }
        ],
        heritage: [
          { title: "UNESCO Steam Toy Train Ride", desc: "Ride the historic steam-engine toy train through tunnels, steep bridges, and Nilgiri tea hills.", icon: "fa-solid fa-train" },
          { title: "Toda Tribal Settlement Visit", desc: "Explore Toda tribal hamlets and inspect their unique barrel-shaped thatched huts.", icon: "fa-solid fa-landmark" }
        ],
        camping: [
          { title: "Ooty Lakeside Forest Camp", desc: "Camp inside the whispering pine forests overlooking a tranquil mountain reservoir.", icon: "fa-solid fa-tent" }
        ]
      }
    }
  };

  if (plannerForm) {
    plannerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const startDateVal = document.getElementById('start-date').value;
      const endDateVal = document.getElementById('end-date').value;
      const state = document.getElementById('destination-select').value;
      const pace = document.getElementById('pace-select').value;
      
      const selectedStyles = [];
      document.querySelectorAll('input[name="style"]:checked').forEach(cb => {
        selectedStyles.push(cb.value);
      });

      const start = new Date(startDateVal);
      const end = new Date(endDateVal);
      
      if (end < start) {
        alert("End Date must be equal to or after the Start Date.");
        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays > 10) {
        alert("For safety and planning accuracy, the planner generates trips up to 10 days. We've capped your generated itinerary at 10 days.");
      }

      const daysCount = Math.min(diffDays, 10);
      generateItineraryTimeline(state, daysCount, selectedStyles, pace, startDateVal, endDateVal);
    });
  }

  function generateItineraryTimeline(state, days, styles, pace, startStr, endStr) {
    placeholderView.style.display = 'none';
    
    const existingCard = resultsContainer.querySelector('.itinerary-card');
    if (existingCard) {
      existingCard.remove();
    }

    const stateData = itineraryDb[state];
    if (!stateData) return;

    let availableActivities = [];
    styles.forEach(style => {
      if (stateData.activities[style]) {
        availableActivities = [...availableActivities, ...stateData.activities[style]];
      }
    });

    if (availableActivities.length === 0) {
      availableActivities = [...(stateData.activities.heritage || []), ...(stateData.activities.trekking || [])];
    }

    const itineraryList = [];
    for (let i = 0; i < days; i++) {
      let activity;
      
      if (i === 0) {
        activity = {
          title: `Arrival at ${state.charAt(0).toUpperCase() + state.slice(1)} Expedition Base`,
          desc: "Check-in at our trail cabins. Attend a briefing with our lead survival guide, run gear diagnostics, and share a local organic dinner.",
          icon: "fa-solid fa-door-open",
          tag: "Briefing"
        };
      } else if (i === days - 1 && days > 1) {
        activity = {
          title: "Expedition Debrief & Departure",
          desc: "Participate in a squad reflection session, return rented survival equipment, pick up organic trail spices, and board your return transfer.",
          icon: "fa-solid fa-plane-departure",
          tag: "Debrief"
        };
      } else {
        const poolIndex = (i - 1) % availableActivities.length;
        const dbActivity = availableActivities[poolIndex];
        activity = {
          title: dbActivity.title,
          desc: dbActivity.desc,
          icon: dbActivity.icon,
          tag: styles[poolIndex % styles.length]
        };
      }
      
      itineraryList.push(activity);
    }

    const card = document.createElement('div');
    card.className = 'itinerary-card';
    
    const startFormatted = new Date(startStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endFormatted = new Date(endStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    let timelineHtml = `
      <div class="itinerary-header">
        <div class="itinerary-title">
          <h4>${stateData.title}</h4>
          <p>${startFormatted} — ${endFormatted}</p>
        </div>
        <div class="itinerary-stats">
          <div class="itinerary-stat-item">
            <span>Duration</span>
            <strong>${days} Days</strong>
          </div>
          <div class="itinerary-stat-item">
            <span>Pace</span>
            <strong style="text-transform: capitalize;">${pace}</strong>
          </div>
        </div>
      </div>
      <div class="timeline">
    `;

    itineraryList.forEach((item, index) => {
      timelineHtml += `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-day">Day 0${index + 1}</div>
            <h5>${item.title}</h5>
            <p>${item.desc}</p>
            <span class="timeline-activity-tag">
              <i class="${item.icon}"></i> ${item.tag || 'Activity'}
            </span>
          </div>
        </div>
      `;
    });

    timelineHtml += `
      </div>
      <div class="timeline-action-buttons">
        <button class="glow-btn" id="book-itinerary-btn">
          <i class="fa-brands fa-whatsapp"></i> Book Custom Expedition
        </button>
      </div>
    `;

    card.innerHTML = timelineHtml;
    resultsContainer.appendChild(card);

    const bookBtn = document.getElementById('book-itinerary-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        openContactModal("Custom Dynamic Itinerary", `Hi Yatrasiri! I planned a custom ${days}-day expedition to ${state.toUpperCase()} from ${startStr} to ${endStr} with a ${pace} pace. Please dispatch details.`);
      });
    }

    if (window.innerWidth < 992) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  // --- 5. Contact Us Dialog & WhatsApp Deep Link ---
  const contactModal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-modal-btn');
  const contactForm = document.getElementById('contact-form');
  const contactNavBtn = document.getElementById('contact-nav-btn');
  const tripSelect = document.getElementById('contact-trip');
  const messageArea = document.getElementById('contact-message');

  function openContactModal(tripName = "General Query", messageText = "") {
    if (contactModal) {
      if (tripSelect) {
        let exists = false;
        for (let i = 0; i < tripSelect.options.length; i++) {
          if (tripSelect.options[i].value === tripName) {
            tripSelect.selectedIndex = i;
            exists = true;
            break;
          }
        }
        if (!exists && tripName) {
          const opt = document.createElement('option');
          opt.value = tripName;
          opt.text = tripName;
          tripSelect.add(opt);
          tripSelect.value = tripName;
        }
      }
      
      if (messageArea) {
        messageArea.value = messageText;
      }

      contactModal.showModal();
    }
  }

  if (contactNavBtn) {
    contactNavBtn.addEventListener('click', () => openContactModal());
  }

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-contact-btn');
    if (btn) {
      const trip = btn.getAttribute('data-trip');
      openContactModal(trip, `Hi Yatrasiri! I'm interested in the ${trip} package. Please share details.`);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => contactModal.close());
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => contactModal.close());
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      const rect = contactModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        contactModal.close();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const trip = tripSelect.value;
      const customMsg = messageArea.value.trim();

      const agencyWhatsApp = "919876543210";

      let message = `*NEW EXPEDITION INQUIRY - YATRASIRI TRAVELS*\n\n`;
      message += `*Name:* ${name}\n`;
      message += `*WhatsApp Number:* +91 ${phone}\n`;
      message += `*Selected Expedition:* ${trip}\n`;
      
      if (customMsg) {
        message += `*Instructions:* ${customMsg}\n`;
      }

      message += `\n_Dispatched via Yatrasiri portal on: ${new Date().toLocaleDateString()}_`;

      const encodedMsg = encodeURIComponent(message);
      const whatsAppLink = `https://wa.me/${agencyWhatsApp}?text=${encodedMsg}`;

      window.open(whatsAppLink, '_blank');
      contactModal.close();
      contactForm.reset();
    });
  }
});
