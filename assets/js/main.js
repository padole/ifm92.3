/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Listen Live (banner Get Started -> play/pause)
   */
  const liveBtn = document.getElementById('listen-live-btn');
  const liveIcon = document.getElementById('listen-live-icon');
  const liveLabel = document.getElementById('listen-live-label');
  const liveStatus = document.getElementById('listen-live-status');
  const liveSubstatus = document.getElementById('listen-live-substatus');
  const liveAudio = document.getElementById('live-audio');
  const liveSource = document.getElementById('live-audio-source');

  // Watch Live (video)
  const watchLiveLink = document.getElementById('watch-live-link');

  const liveVideo = document.getElementById('live-video');
  const liveVideoSource = document.getElementById('live-video-source');
  const liveVideoFallback = document.getElementById('live-video-fallback');

  function setUI(state) {
    // state: idle | loading | playing | paused | error
    if (liveIcon) {
      if (state === 'playing') {
        liveIcon.classList.remove('bi-play-circle');
        liveIcon.classList.add('bi-pause-circle');
      } else {
        liveIcon.classList.remove('bi-pause-circle');
        liveIcon.classList.add('bi-play-circle');
      }
    }

    if (liveLabel) {
      if (state === 'playing') liveLabel.textContent = 'Listening';
      else if (state === 'loading') liveLabel.textContent = 'Connecting';
      else liveLabel.textContent = 'Listen Live';
    }

    if (liveStatus) {
      if (state === 'playing') liveStatus.textContent = 'ON AIR NOW';
      else if (state === 'loading') liveStatus.textContent = 'LISTENING';
      else if (state === 'paused') liveStatus.textContent = 'PAUSED';
      else if (state === 'error') liveStatus.textContent = 'STREAM ERROR';
      else liveStatus.textContent = 'LISTEN LIVE';
    }

    if (liveSubstatus) {
      if (state === 'error') liveSubstatus.textContent = 'Add your live stream URL to <source src="..."> in index.html.';
      else liveSubstatus.textContent = '';
    }
  }

  function getAudioStreamUrl() {
    // Read the stream URL from the <source> element.
    // Fallback to the known ElektranBroadcast stream.
    return liveSource?.getAttribute('src') || 'https://azstream.elektranbroadcast.com/listen/ifm923/radio.mp3';
  }



  function getVideoStreamUrl() {
    // Prefer explicit <source> if present
    const sourceSrc = liveVideoSource?.getAttribute('src') || '';
    if (sourceSrc) return sourceSrc;

    // Fallback: allow blob/url to be stored directly on the wrapper
    const fallbackSrc = document.getElementById('live-video-source-url')?.value || '';
    return fallbackSrc;
  }

  if (liveBtn && liveAudio && liveSource) {
    setUI('idle');

    let userAttempted = false;

    liveBtn.addEventListener('click', async () => {
      userAttempted = true;

      const streamUrl = getAudioStreamUrl();
      if (!streamUrl) {
        setUI('error');
        return;
      }

      try {
        // Ensure the <audio> is pointing to the live stream URL we expect.
        // (Some browsers keep a cached/empty source depending on how the page was loaded.)
        if (liveAudio && liveSource) {
          if (liveSource.getAttribute('src') !== streamUrl) {
            liveSource.setAttribute('src', streamUrl);
          }
        }

        if (liveAudio.paused) {
          setUI('loading');
          liveAudio.load();
          await liveAudio.play();
          setUI('playing');
        } else {
          liveAudio.pause();
          setUI('paused');
        }

      } catch (err) {
        setUI('error');
      }
    });

    liveAudio.addEventListener('playing', () => {
      if (!userAttempted) return;
      setUI('playing');
    });

    liveAudio.addEventListener('pause', () => {
      if (!userAttempted) return;
      if (liveAudio.currentTime > 0) setUI('paused');
    });

    liveAudio.addEventListener('waiting', () => {
      if (!userAttempted) return;
      setUI('loading');
    });

    liveAudio.addEventListener('error', () => {
      userAttempted = false;
      setUI('error');
    });
  }

  // Bind Watch Live button to play the provided blob URL in <video>
  if (watchLiveLink && liveVideo && liveVideoFallback) {
    watchLiveLink.addEventListener('click', async (e) => {
      e.preventDefault();

      const url = getVideoStreamUrl();
      if (!url) {
        liveVideoFallback.style.display = 'block';
        liveVideoFallback.textContent = 'Video stream URL missing.';
        return;
      }

      // Show video element (glightbox is not used for blob playback)
      liveVideo.style.display = 'block';
      liveVideoFallback.style.display = 'none';

      // Reload source
      liveVideo.pause();
      liveVideo.load();

      try {
        // Attempt autoplay after user gesture
        await liveVideo.play();
      } catch (err) {
        // Many browsers may block playback even after click
        liveVideoFallback.style.display = 'block';
        liveVideoFallback.textContent = 'Your browser blocked auto-play. Please press Play on the video controls.';
      }
    });

    // Better UX: keep fallback hidden once metadata loads
    liveVideo.addEventListener('playing', () => {
      if (liveVideoFallback) liveVideoFallback.style.display = 'none';
    });

    liveVideo.addEventListener('error', () => {
      if (!liveVideoFallback) return;
      liveVideoFallback.style.display = 'block';
      liveVideoFallback.textContent = 'Video stream failed to load. If this is a blob URL, it usually must be generated fresh on the server/session.';
    });
  }

})();

