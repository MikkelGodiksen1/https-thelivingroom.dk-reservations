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
    heroVideo.muted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    var playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () {
        // Retry on user interaction if autoplay blocked
        document.addEventListener('click', function playOnce() {
          heroVideo.play();
          document.removeEventListener('click', playOnce);
        });
      });
    }
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
