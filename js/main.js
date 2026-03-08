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

  // Hero video autoplay with fallback image
  var heroVideo = document.getElementById('heroVideo');
  var heroFallback = document.getElementById('heroFallback');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.volume = 0;

    function onVideoPlaying() {
      if (heroFallback) {
        heroFallback.classList.add('is-hidden');
      }
    }

    heroVideo.addEventListener('playing', onVideoPlaying);

    function tryPlay() {
      var p = heroVideo.play();
      if (p !== undefined) {
        p.then(function () {
          onVideoPlaying();
        }).catch(function () {
          // Autoplay blocked — play on first user interaction
          ['click', 'touchstart', 'scroll', 'keydown'].forEach(function (evt) {
            document.addEventListener(evt, function handler() {
              heroVideo.muted = true;
              heroVideo.play().then(onVideoPlaying).catch(function () {});
              document.removeEventListener(evt, handler);
            }, { once: true });
          });
        });
      }
    }

    // Try at multiple stages to cover all browser behaviours
    tryPlay();
    heroVideo.addEventListener('canplay', tryPlay);
    setTimeout(tryPlay, 300);
    setTimeout(tryPlay, 1000);
    setTimeout(tryPlay, 2500);
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
  // Gallery scroll-triggered fade-in
  var fadeItems = document.querySelectorAll('.gallery__fade');
  if (fadeItems.length > 0 && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    fadeItems.forEach(function (item) {
      fadeObserver.observe(item);
    });
  }
})();
