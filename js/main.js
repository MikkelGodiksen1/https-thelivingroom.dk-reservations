// The Living Room — Main JavaScript

(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('nav__links--open');
      var isOpen = links.classList.contains('nav__links--open');
      toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile)
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('nav__links--open');
        toggle.innerHTML = '&#9776;';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Force autoplay hero video
  var heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    // Ensure muted is set (required for autoplay in all browsers)
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.volume = 0;

    function tryPlay() {
      var p = heroVideo.play();
      if (p !== undefined) {
        p.catch(function () {
          // If autoplay still blocked, retry on any user interaction
          ['click', 'touchstart', 'scroll'].forEach(function (evt) {
            document.addEventListener(evt, function handler() {
              heroVideo.muted = true;
              heroVideo.play();
              document.removeEventListener(evt, handler);
            }, { once: true });
          });
        });
      }
    }

    // Try immediately
    tryPlay();

    // Also try when video data is ready
    heroVideo.addEventListener('loadeddata', tryPlay);
    heroVideo.addEventListener('canplay', tryPlay);

    // Also try after a short delay (some browsers need this)
    setTimeout(tryPlay, 500);
    setTimeout(tryPlay, 1500);
  }

  // Scroll-aware nav (home page only — when nav starts transparent)
  var navbar = document.getElementById('navbar');
  var hero = document.getElementById('hero');

  if (navbar && hero && navbar.classList.contains('nav--transparent')) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navbar.classList.add('nav--transparent');
            navbar.classList.remove('nav--solid');
          } else {
            navbar.classList.remove('nav--transparent');
            navbar.classList.add('nav--solid');
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(hero);
  }
})();
