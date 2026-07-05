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

  // Initialize and bind calendar constraints on load
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  if (startDateInput && endDateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    startDateInput.min = todayStr;
    endDateInput.min = todayStr;

    startDateInput.addEventListener('change', () => {
      if (startDateInput.value) {
        endDateInput.min = startDateInput.value;
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
          endDateInput.value = startDateInput.value;
        }
      }
    });

    // Block keyboard manual input and trigger calendar popup on click/focus
    [startDateInput, endDateInput].forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' && e.key !== 'Escape') {
          e.preventDefault();
        }
      });
      input.addEventListener('click', () => {
        try {
          input.showPicker();
        } catch (err) {}
      });
      input.addEventListener('focus', () => {
        try {
          input.showPicker();
        } catch (err) {}
      });
    });
  }

  // All-States Terrain Classification Catalog
  const stateGeographies = {
    "Andhra Pradesh": { type: "canyon", tag: "Canyons & Sandstone Cliffs" },
    "Arunachal Pradesh": { type: "himalayan", tag: "Snowy Ridges & Alpine Forests" },
    "Assam": { type: "rainforest", tag: "Misty Valleys & Wildlife Trails" },
    "Bihar": { type: "heritage", tag: "Ancient Monasteries & Plains" },
    "Chhattisgarh": { type: "rainforest", tag: "Hidden Waterfalls & Dense Jungles" },
    "Goa": { type: "coastal", tag: "Golden Beaches & Spice Orchards" },
    "Gujarat": { type: "heritage", tag: "Salt Deserts & Historic Forts" },
    "Haryana": { type: "heritage", tag: "Heritage Plains & Rural Fields" },
    "Himachal Pradesh": { type: "himalayan", tag: "Pine Valleys & Snowy Passes" },
    "Jharkhand": { type: "rainforest", tag: "Wooded Trails & Waterfalls" },
    "Karnataka": { type: "coastal", tag: "Deccan Boulders & Western Ghats" },
    "Kerala": { type: "coastal", tag: "Misty Mountains & Backwater Canals" },
    "Madhya Pradesh": { type: "heritage", tag: "Tiger Reserves & Temple Fortresses" },
    "Maharashtra": { type: "coastal", tag: "Western Ghats & Fortified Coasts" },
    "Manipur": { type: "rainforest", tag: "Floating Lakes & Emerald Valleys" },
    "Meghalaya": { type: "rainforest", tag: "Living Root Bridges & Caves" },
    "Mizoram": { type: "rainforest", tag: "Bamboo Forests & High Hills" },
    "Nagaland": { type: "rainforest", tag: "Misty Ridges & Tribal Trails" },
    "Odisha": { type: "coastal", tag: "Mangrove Coasts & Historic Temples" },
    "Punjab": { type: "heritage", tag: "Golden Fields & Historic Sites" },
    "Rajasthan": { type: "heritage", tag: "Sand Dunes & Maharaja Fortresses" },
    "Sikkim": { type: "himalayan", tag: "Glacial Lakes & Mount Kanchenjunga" },
    "Tamil Nadu": { type: "coastal", tag: "Nilgiri Toy Train & Coastal Temples" },
    "Telangana": { type: "heritage", tag: "Deccan Forts & Lake Basins" },
    "Tripura": { type: "rainforest", tag: "Rock Carvings & Emerald Valleys" },
    "Uttar Pradesh": { type: "heritage", tag: "Ganges Plains & Taj Monuments" },
    "Uttarakhand": { type: "himalayan", tag: "High Meadows & Glacial Rivers" },
    "West Bengal": { type: "coastal", tag: "Sundarban Delta & Darjeeling Slopes" }
  };

  // Terrain-Specific Activity Databases
  const activitiesByGeo = {
    himalayan: {
      trekking: [
        { title: "Alpine Valley Ridge Trek", desc: "Trek through high altitude shola meadows, looking out at snowy mountain slopes.", icon: "fa-solid fa-person-hiking" },
        { title: "Glacial Pass Ascent", desc: "Climb past the tree line to a steep mountain pass, crossing freezing streams and rocky slopes.", icon: "fa-solid fa-mountain" }
      ],
      beach: [
        { title: "Glacial River Water Rafting", desc: "Navigate freezing, rushing rapids fed directly by Himalayan glaciers.", icon: "fa-solid fa-water" },
        { title: "Alpine Lake Rowboating", desc: "Paddle through crystal clear waters of a high-altitude mountain reservoir.", icon: "fa-solid fa-ship" }
      ],
      heritage: [
        { title: "Monastery Cliff Walk", desc: "Explore ancient hilltop Buddhist monasteries, listening to prayers and wind bells.", icon: "fa-solid fa-landmark" },
        { title: "Historic Trading Route Trail", desc: "Walk along sections of ancient trails, checking out stone watchtowers and trade posts.", icon: "fa-solid fa-map" }
      ],
      camping: [
        { title: "Alpine Meadow Stargazing Camp", desc: "Camp in dome tents in a high alpine meadow. Enjoy sub-zero stargazing around a wood fire.", icon: "fa-solid fa-tent" },
        { title: "Pine Forest Ridge Camp", desc: "Set up tents in a whispering pine forest, watching the valley clouds roll in at dusk.", icon: "fa-solid fa-campground" }
      ]
    },
    coastal: {
      trekking: [
        { title: "Western Ghats Highland Hike", desc: "Trek under the evergreen canopy, seeking endemic species and mossy streams.", icon: "fa-solid fa-person-hiking" },
        { title: "Coastal Cliff Ridge Walk", desc: "Trek along coastal red clay cliffs with panoramic views of the ocean waves.", icon: "fa-solid fa-leaf" }
      ],
      beach: [
        { title: "Black Sand Beach Surf Session", desc: "Take surf lessons on clean ocean swells, ending with beach yoga at sunset.", icon: "fa-solid fa-water" },
        { title: "Mangrove Backwater Kayaking", desc: "Paddle through dense mangrove tunnels, watching kingfishers and river otters.", icon: "fa-solid fa-ship" }
      ],
      heritage: [
        { title: "Coastal Fort Ruins Walk", desc: "Explore a medieval stone fortress jutting into the sea, inspecting rusty ramparts.", icon: "fa-solid fa-landmark" },
        { title: "Old Town Cycling Trail", desc: "Cycle through narrow streets of a historic trading port, admiring colonial architecture.", icon: "fa-solid fa-bicycle" }
      ],
      camping: [
        { title: "Lakeside Forest Camp", desc: "Camp on the grassy banks of a clean lake, cooking trail meals over a campfire.", icon: "fa-solid fa-tent" },
        { title: "Beach Cliff Stargazing Camp", desc: "Pitch camp overlooking the ocean cliff. Fall asleep to the sound of breaking waves.", icon: "fa-solid fa-campground" }
      ]
    },
    rainforest: {
      trekking: [
        { title: "Living Root Bridge Exploration", desc: "Trek down deep gorges to cross suspension root bridges grown organically over centuries.", icon: "fa-solid fa-bridge" },
        { title: "Jungle Canopy Hike", desc: "Hike through thick tropical rainforests, climbing root steps and listening to gibbon calls.", icon: "fa-solid fa-tree" }
      ],
      beach: [
        { title: "Forest River Raft Crossing", desc: "Cross a rushing tropical river in a bamboo raft, navigating mild forest rapids.", icon: "fa-solid fa-water" },
        { title: "Hidden Waterfall Swim", desc: "Trek to a secluded multi-tiered jungle pool, swimming in the fresh spray.", icon: "fa-solid fa-ship" }
      ],
      heritage: [
        { title: "Tribal Settlement Walk", desc: "Visit traditional tribal villages, observing bamboo weaving and local architecture.", icon: "fa-solid fa-landmark" },
        { title: "Ancient Rock Carving Site", desc: "Hike to a hidden rock wall covered in historic carvings and sacred glyphs.", icon: "fa-solid fa-gem" }
      ],
      camping: [
        { title: "Deep Jungle Eco Camp", desc: "Camp in elevated tree houses or forest tents, listening to jungle crickets and bird calls.", icon: "fa-solid fa-tent" },
        { title: "Jungle Riverbed Pitch", desc: "Pitch tents on a clean, rocky riverbed deep inside the rainforest sanctuary.", icon: "fa-solid fa-campground" }
      ]
    },
    heritage: {
      trekking: [
        { title: "Aravalli Range Desert Trek", desc: "Trek through dry, rocky ridges and thorn scrub, watching for peacocks and wildlife.", icon: "fa-solid fa-person-hiking" },
        { title: "Ancient Reservoir Trail", desc: "Hike around historical stone stepwells and abandoned dams built by ancient kings.", icon: "fa-solid fa-leaf" }
      ],
      beach: [
        { title: "Sacred River Boat Crossing", desc: "Cross a wide, historic river on a wooden boat, observing ghats and temple towers.", icon: "fa-solid fa-ship" },
        { title: "Oasis Reservoir Kayaking", desc: "Paddle across a peaceful desert lake surrounded by ancient dome pavilions.", icon: "fa-solid fa-water" }
      ],
      heritage: [
        { title: "Sandstone Palace Fortress Tour", desc: "Walk through massive stone battlements, exploring maze-like courtyards and carved gates.", icon: "fa-solid fa-landmark" },
        { title: "UNESCO Heritage ruins Cycling", desc: "Explore sprawling stone temple ruins and ancient pillars on cruiser bicycles.", icon: "fa-solid fa-bicycle" }
      ],
      camping: [
        { title: "Fort Ramparts Bonfire Camp", desc: "Camp in the foothills of a medieval fortress, dining on traditional campfire delicacies.", icon: "fa-solid fa-tent" },
        { title: "Sand Dunes Desert Camp", desc: "Pitch luxury canvas tents in the sand dunes. Watch the sky light up with millions of stars.", icon: "fa-solid fa-campground" }
      ]
    },
    canyon: {
      trekking: [
        { title: "Sandstone Gorge Trail Trek", desc: "Hike along high, red sandstone canyon walls, climbing stone boulders and crevices.", icon: "fa-solid fa-person-hiking" },
        { title: "Canyon Riverbed Hike", desc: "Trek down the canyon side to walk along the sandy riverbanks of a gorge.", icon: "fa-solid fa-leaf" }
      ],
      beach: [
        { title: "Canyon Gorge Kayaking", desc: "Paddle through deep sandstone gorge walls, looking up at the towering cliffs.", icon: "fa-solid fa-ship" },
        { title: "River Pool Swim", desc: "Swim in the calm, freshwater pools of the canyon riverbed under the shade of massive rocks.", icon: "fa-solid fa-water" }
      ],
      heritage: [
        { title: "Sandstone Fortress Exploration", desc: "Explore a medieval sandstone fortress built right on the edge of a deep gorge.", icon: "fa-solid fa-landmark" },
        { title: "Subterranean Caves Trail", desc: "Descend into dark, limestone caverns with stalactites and deep maze paths.", icon: "fa-solid fa-gem" }
      ],
      camping: [
        { title: "Canyon Edge Stargazing Camp", desc: "Camp directly on the sandstone canyon edge, watching the gorge walls glow red in the sunrise.", icon: "fa-solid fa-tent" },
        { title: "Sandy Riverbed Camp", desc: "Pitch tents on the quiet sandy riverbanks deep inside the sandstone canyon.", icon: "fa-solid fa-campground" }
      ]
    }
  };

  // --- 4.1 Custom Toast Notification Utility ---
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-alert';
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
    container.appendChild(toast);

    // Force reflow
    toast.offsetHeight;
    toast.classList.add('show');

    // Slide out and remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 5000);
  }

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (start < today) {
        showToast("Start Date must be today or in the future.");
        return;
      }
      if (end < start) {
        showToast("End Date must be equal to or after the Start Date.");
        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays > 10) {
        showToast("For More than 10 days trip , contact us , here is the first 10 days itenerary");
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

    const geoData = stateGeographies[state] || { type: "heritage", tag: "Heritage Plains & Ruins" };
    const geoActivities = activitiesByGeo[geoData.type] || activitiesByGeo.heritage;

    let availableActivities = [];
    styles.forEach(style => {
      if (geoActivities[style]) {
        availableActivities = [...availableActivities, ...geoActivities[style]];
      }
    });

    if (availableActivities.length === 0) {
      availableActivities = [...(geoActivities.heritage || []), ...(geoActivities.trekking || [])];
    }

    const itineraryList = [];
    for (let i = 0; i < days; i++) {
      let activity;
      
      if (i === 0) {
        activity = {
          title: `Arrival at ${state} Expedition Base`,
          desc: `Check-in at our local ${state} basecamp cabins. Meet your team, run diagnostics on safety gear, and share a local trail dinner.`,
          icon: "fa-solid fa-door-open",
          tag: "Briefing"
        };
      } else if (i === days - 1 && days > 1) {
        activity = {
          title: `Expedition Debrief & Departure`,
          desc: "Participate in a trail debriefing session with the group, check out from the local cabins, return leased gear, and take your return transfers.",
          icon: "fa-solid fa-plane-departure",
          tag: "Debrief"
        };
      } else {
        const poolIndex = (i - 1) % availableActivities.length;
        const dbActivity = availableActivities[poolIndex];
        
        let descModifier = "";
        if (pace === "intense") {
          descModifier = " Expect a high-intensity, demanding pace designed to challenge your endurance on this active day.";
        } else if (pace === "relaxed") {
          descModifier = " Conducted at a slow, leisurely pace with frequent hydration stops and nature observation pauses.";
        }

        activity = {
          title: `${state} ${dbActivity.title}`,
          desc: dbActivity.desc + descModifier,
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
          <h4>${state} Trail Expedition</h4>
          <p>${geoData.tag} // ${startFormatted} — ${endFormatted}</p>
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
