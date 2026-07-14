/**
 * js/app.js — Broadcast Authority Portfolio
 * ============================================================
 * All site interaction logic in one organised file.
 * No ES modules, no imports — works by opening index.html
 * directly in a browser (double-click or Live Server).
 *
 * Sections:
 *   1. Theme (light/dark toggle + localStorage)
 *   2. Navigation (sticky, hamburger, active links)
 *   3. Programs Tabs
 *   4. Gallery (filter + lightbox)
 *   5. Contact Form Validation
 *   6. Scroll Reveal (IntersectionObserver)
 *   7. Smooth Scroll (respects sticky nav height)
 *   8. News Ticker (pause on hover)
 *   9. Image Fallbacks
 *  10. Footer Year
 * ============================================================
 */

(function () {
  'use strict';

  /* ============================================================
     1. THEME MANAGEMENT
  ============================================================ */
  var THEME_KEY = 'portfolioTheme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initTheme() {
    applyTheme(getTheme());
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
      });
    }
  }

  /* ============================================================
     2. NAVIGATION
  ============================================================ */
  function initNavigation() {
    var nav       = document.getElementById('mainNav');
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    var backdrop  = document.getElementById('navBackdrop');
    var navLinks  = Array.from(document.querySelectorAll('.nav__link[data-section]'));
    var sections  = Array.from(document.querySelectorAll('main section[id]'));

    function updateScroll() {
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 20);
    }

    function updateActive() {
      var pos = window.scrollY + window.innerHeight * 0.35;
      var current = '';
      sections.forEach(function (s) {
        if (s.offsetTop <= pos) current = s.id;
      });
      navLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.dataset.section === current);
      });
    }

    window.addEventListener('scroll', function () {
      updateScroll(); updateActive();
    }, { passive: true });
    updateScroll();
    updateActive();

    function openMenu() {
      if (mobileNav) { mobileNav.classList.add('is-open'); mobileNav.setAttribute('aria-hidden', 'false'); }
      if (backdrop)   backdrop.classList.add('is-visible');
      if (hamburger)  hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = mobileNav && mobileNav.querySelector('.nav__mobile-link');
      if (first) first.focus();
    }

    function closeMenu() {
      if (mobileNav) { mobileNav.classList.remove('is-open'); mobileNav.setAttribute('aria-hidden', 'true'); }
      if (backdrop)   backdrop.classList.remove('is-visible');
      if (hamburger) { hamburger.setAttribute('aria-expanded', 'false'); hamburger.focus(); }
      document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', function () {
      mobileNav && mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    if (mobileNav) {
      mobileNav.querySelectorAll('.nav__mobile-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) closeMenu();
    });
  }

  /* ============================================================
     3. PROGRAMS TABS
  ============================================================ */
  function initProgramsTabs() {
    var tabs   = Array.from(document.querySelectorAll('.programs__tab'));
    var panels = Array.from(document.querySelectorAll('.programs__panel'));
    if (!tabs.length) return;

    function activate(tab) {
      tabs.forEach(function (t) {
        var isIt = t === tab;
        t.classList.toggle('programs__tab--active', isIt);
        t.setAttribute('aria-selected', String(isIt));
      });
      var targetId = tab.getAttribute('aria-controls');
      panels.forEach(function (p) {
        var isIt = p.id === targetId;
        p.classList.toggle('programs__panel--active', isIt);
        isIt ? p.removeAttribute('hidden') : p.setAttribute('hidden', '');
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var idx  = tabs.indexOf(tab);
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
        if (e.key === 'ArrowLeft')  next = tabs[(idx - 1 + tabs.length) % tabs.length];
        if (next) { e.preventDefault(); next.focus(); activate(next); }
      });
    });
    activate(tabs[0]);
  }

  /* ============================================================
     4. GALLERY — FILTER + LIGHTBOX
  ============================================================ */
  function initGallery() {
    var filterBtns  = Array.from(document.querySelectorAll('.gallery__filter-btn'));
    var galleryGrid = document.getElementById('galleryGrid');
    var lightbox    = document.getElementById('lightbox');
    var lbBackdrop  = document.getElementById('lightboxBackdrop');
    var lbMedia     = document.getElementById('lightboxMedia');
    var lbClose     = document.getElementById('lightboxClose');
    var lbPrev      = document.getElementById('lightboxPrev');
    var lbNext      = document.getElementById('lightboxNext');
    if (!galleryGrid) return;

    var visibleItems = [];
    var currentIdx   = 0;
    var lastFocused  = null;

    function refreshItems() {
      visibleItems = Array.from(
        galleryGrid.querySelectorAll('.gallery__item:not(.gallery__item--hidden)')
      );
    }

    function applyFilter(filter) {
      var all = Array.from(galleryGrid.querySelectorAll('.gallery__item'));
      all.forEach(function (item, i) {
        var show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('gallery__item--hidden', !show);
        if (show) item.style.transitionDelay = (i * 0.03) + 's';
      });
      refreshItems();
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('gallery__filter-btn--active'); });
        btn.classList.add('gallery__filter-btn--active');
        applyFilter(btn.dataset.filter);
      });
    });

    function showItem(idx) {
      var item = visibleItems[idx];
      if (!item || !lbMedia) return;
      lbMedia.innerHTML = '';

      if (item.dataset.type === 'video') {
        var src    = item.dataset.videoSrc;
        var auto   = src + (src.indexOf('?') !== -1 ? '&' : '?') + 'autoplay=1';
        var iframe = document.createElement('iframe');
        iframe.src = auto; iframe.title = 'Video player'; iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        lbMedia.appendChild(iframe);
      } else {
        var img = item.querySelector('.gallery__img');
        if (img) {
          var el = document.createElement('img'); el.src = img.src; el.alt = img.alt || 'Gallery image';
          lbMedia.appendChild(el);
        }
      }
      if (lbPrev) lbPrev.style.opacity = idx === 0                     ? '0.3' : '1';
      if (lbNext) lbNext.style.opacity = idx === visibleItems.length-1 ? '0.3' : '1';
    }

    function openLightbox(idx) {
      lastFocused = document.activeElement; currentIdx = idx;
      showItem(currentIdx);
      if (lightbox) lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { if (lbClose) lbClose.focus(); }, 50);
    }

    function closeLightbox() {
      if (lightbox) lightbox.setAttribute('hidden', '');
      if (lbMedia)  lbMedia.innerHTML = '';
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    function navigate(dir) {
      var next = currentIdx + dir;
      if (next >= 0 && next < visibleItems.length) { currentIdx = next; showItem(currentIdx); }
    }

    function trapFocus(e) {
      if (!lightbox || lightbox.hasAttribute('hidden')) return;
      var focusable = Array.from(lightbox.querySelectorAll('button:not([disabled]),[href],[tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length-1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    galleryGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lightbox]');
      if (!btn) return;
      var item = btn.closest('.gallery__item');
      if (!item) return;
      refreshItems();
      var idx = visibleItems.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });

    if (lbClose)    lbClose.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    if (lbPrev)     lbPrev.addEventListener('click', function () { navigate(-1); });
    if (lbNext)     lbNext.addEventListener('click', function () { navigate(1); });

    document.addEventListener('keydown', function (e) {
      if (!lightbox || lightbox.hasAttribute('hidden')) return;
      if (e.key === 'Escape')     { closeLightbox(); return; }
      if (e.key === 'ArrowLeft')  { navigate(-1);    return; }
      if (e.key === 'ArrowRight') { navigate(1);     return; }
      trapFocus(e);
    });

    refreshItems();
  }

  /* ============================================================
     5. CONTACT FORM VALIDATION
  ============================================================ */
  function initContactForm() {
    var form       = document.getElementById('contactForm');
    var submitBtn  = document.getElementById('contactSubmit');
    var successMsg = document.getElementById('formSuccess');
    if (!form) return;

    var fields = {
      name:    { id: 'contactName',    errId: 'nameError',    label: 'Full name' },
      email:   { id: 'contactEmail',   errId: 'emailError',   label: 'Email address' },
      subject: { id: 'contactSubject', errId: 'subjectError', label: 'Subject' },
      message: { id: 'contactMessage', errId: 'messageError', label: 'Message' }
    };

    function showError(field, msg) {
      var err = document.getElementById(field.errId);
      var inp = document.getElementById(field.id);
      if (err) err.textContent = msg;
      if (inp) inp.classList.add('is-error');
    }
    function clearError(field) {
      var err = document.getElementById(field.errId);
      var inp = document.getElementById(field.id);
      if (err) err.textContent = '';
      if (inp) inp.classList.remove('is-error');
    }

    function validate() {
      var valid = true;
      Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        clearError(field);
        var inp = document.getElementById(field.id);
        if (!inp) return;
        var val = inp.value.trim();
        if (!val) { showError(field, field.label + ' is required.'); valid = false; return; }
        if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showError(field, 'Please enter a valid email address.'); valid = false; return;
        }
        if (key === 'message' && val.length < 20) {
          showError(field, 'Please write at least 20 characters.'); valid = false;
        }
      });
      return valid;
    }

    Object.keys(fields).forEach(function (key) {
      var inp = document.getElementById(fields[key].id);
      if (inp) inp.addEventListener('input', function () { if (inp.classList.contains('is-error')) clearError(fields[key]); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstKey = Object.keys(fields).find(function (k) {
          var el = document.getElementById(fields[k].id);
          return el && el.classList.contains('is-error');
        });
        if (firstKey) { var el = document.getElementById(fields[firstKey].id); if (el) el.focus(); }
        return;
      }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }
      /* Replace setTimeout with real fetch() / Formspree when backend is ready */
      setTimeout(function () {
        form.reset();
        Object.keys(fields).forEach(function (k) { clearError(fields[k]); });
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
        if (successMsg) {
          successMsg.removeAttribute('hidden'); successMsg.focus();
          setTimeout(function () { successMsg.setAttribute('hidden', ''); }, 6000);
        }
      }, 1200);
    });
  }

  /* ============================================================
     6. SCROLL REVEAL
  ============================================================ */
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var els = Array.from(document.querySelectorAll('.reveal'));
    var processed = new Set();
    els.forEach(function (el) {
      var parent = el.parentElement;
      if (processed.has(parent)) return;
      var siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
      if (siblings.length > 1) {
        siblings.forEach(function (sib, i) { sib.style.setProperty('--reveal-delay', (i * 0.1) + 's'); });
        processed.add(parent);
      }
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     7. SMOOTH SCROLL
  ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        var navH = (document.getElementById('mainNav') || {}).offsetHeight || 68;
        var top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
        if (history.pushState) history.pushState(null, '', href);
      });
    });
  }

  /* ============================================================
     8. NEWS TICKER
  ============================================================ */
  function initTicker() {
    var ticker = document.querySelector('.hero__ticker');
    var tape   = document.querySelector('.hero__ticker-tape');
    if (!ticker || !tape) return;
    ticker.addEventListener('mouseenter', function () { tape.style.animationPlayState = 'paused'; });
    ticker.addEventListener('mouseleave', function () { tape.style.animationPlayState = 'running'; });
  }

  /* ============================================================
     9. IMAGE FALLBACKS
  ============================================================ */
  function attachFallback(img, fallbackEl) {
    if (!img) return;
    function onError() { img.classList.add('is-error'); if (fallbackEl) fallbackEl.style.display = 'flex'; }
    if (img.complete && img.naturalWidth === 0) { onError(); }
    else img.addEventListener('error', onError, { once: true });
  }

  function initImageFallbacks() {
    var heroImg   = document.getElementById('heroImage');
    var heroFrame = document.getElementById('heroFrame');
    if (heroImg && heroFrame) {
      function heroError() {
        heroImg.classList.add('is-error');
        if (!heroFrame.querySelector('.hero__frame-placeholder-text')) {
          var label = document.createElement('div');
          label.className   = 'hero__frame-placeholder-text';
          label.textContent = 'Profile Photo \u00b7 assets/images/profile-news-presenter.jpg';
          heroFrame.appendChild(label);
        }
      }
      if (heroImg.complete && heroImg.naturalWidth === 0) heroError();
      else heroImg.addEventListener('error', heroError, { once: true });
    }
    document.querySelectorAll('.achievement-card__image').forEach(function (img) {
      var fb = img.closest('.achievement-card__visual') && img.closest('.achievement-card__visual').querySelector('.achievement-card__img-fallback');
      attachFallback(img, fb);
    });
    document.querySelectorAll('.training-card__cert-img').forEach(function (img) {
      var fb = img.closest('.training-card__cert') && img.closest('.training-card__cert').querySelector('.training-card__cert-fallback');
      attachFallback(img, fb);
    });
    document.querySelectorAll('.gallery__img').forEach(function (img) {
      var fb = img.closest('.gallery__item-inner') && img.closest('.gallery__item-inner').querySelector('.gallery__img-fallback');
      attachFallback(img, fb);
    });
  }

  /* ============================================================
     10. FOOTER YEAR
  ============================================================ */
  function setFooterYear() {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ============================================================
     INITIALISE
  ============================================================ */
  function init() {
    initTheme();
    initNavigation();
    initProgramsTabs();
    initGallery();
    initContactForm();
    initScrollReveal();
    initSmoothScroll();
    initTicker();
    initImageFallbacks();
    setFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
