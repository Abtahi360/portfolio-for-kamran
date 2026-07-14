/**
 * js/cursor.js — Broadcast Focus Custom Cursor
 * ============================================================
 * Design: "Broadcast Tally + Lens Focus Ring"
 *   • Dot  → camera tally light (the on-air cue dot)
 *   • Ring → camera lens focus ring (trails behind mouse)
 *
 * Colors update automatically when theme changes via CSS vars.
 * To change sizes edit CONFIG below.
 * To change colors edit --cursor-* variables in css/theme.css
 *
 * This file uses no imports and no ES modules.
 * It works by opening index.html directly in a browser.
 * ============================================================
 */

(function () {
  'use strict';

  /* ── Skip on touch / coarse-pointer devices (mobile/tablet) ── */
  if (window.matchMedia('(pointer: coarse)').matches) return;

  /* ── Configuration ── */
  var CONFIG = {
    dotSize:      8,    /* px — tally dot default diameter          */
    dotHoverSize: 14,   /* px — tally dot when over clickable items */
    ringSize:     36,   /* px — focus ring default diameter         */
    ringHoverSize:50,   /* px — focus ring when over clickable items */
    lerpFactor:   0.10, /* ring lag (0 = frozen, 1 = instant)       */

    /* Elements that trigger the hover accent state */
    interactiveSelector: [
      'a', 'button', '.btn',
      '.programs__tab', '.gallery__filter-btn',
      '.video-card', '.achievement-card', '.training-card',
      '.gallery__item-btn', '.nav__theme-btn', '.nav__hamburger',
      '.timeline__body', '.skills__category', 'label',
      '[role="tab"]', '[role="button"]'
    ].join(', ')
  };

  /* ── State ── */
  var dot  = null;
  var ring = null;
  var mouseX = -200, mouseY = -200;
  var ringX  = -200, ringY  = -200;
  var isHovering = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Create cursor elements ── */
  function create() {
    dot  = document.createElement('div');
    ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');

    setSizes(CONFIG.dotSize, CONFIG.ringSize);

    document.body.appendChild(ring); /* ring first (lower z-index) */
    document.body.appendChild(dot);
    document.body.classList.add('cursor-custom');
  }

  /* ── Size helpers ── */
  function setSizes(dotSz, ringSz) {
    dot.style.width      = dotSz  + 'px';
    dot.style.height     = dotSz  + 'px';
    dot.style.marginLeft = '-' + (dotSz  / 2) + 'px';
    dot.style.marginTop  = '-' + (dotSz  / 2) + 'px';

    ring.style.width      = ringSz + 'px';
    ring.style.height     = ringSz + 'px';
    ring.style.marginLeft = '-' + (ringSz / 2) + 'px';
    ring.style.marginTop  = '-' + (ringSz / 2) + 'px';
  }

  /* ── Show / hide ── */
  function show() {
    dot.classList.add('is-visible');
    ring.classList.add('is-visible');
  }
  function hide() {
    dot.classList.remove('is-visible');
    ring.classList.remove('is-visible');
  }

  /* ── Hover accent on interactive elements ── */
  function onHoverStart() {
    if (isHovering) return;
    isHovering = true;
    document.body.classList.add('cursor-hover');
    setSizes(CONFIG.dotHoverSize, CONFIG.ringHoverSize);
  }
  function onHoverEnd() {
    if (!isHovering) return;
    isHovering = false;
    document.body.classList.remove('cursor-hover');
    setSizes(CONFIG.dotSize, CONFIG.ringSize);
  }

  /* ── Event bindings ── */
  function bindEvents() {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      /* First move: snap ring into position, then reveal */
      if (!dot.classList.contains('is-visible')) {
        ringX = mouseX;
        ringY = mouseY;
        show();
      }
    }, { passive: true });

    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    /* Hover detection */
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(CONFIG.interactiveSelector)) onHoverStart();
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(CONFIG.interactiveSelector)) onHoverEnd();
    });

    /* Hide ring over form inputs for clean text editing */
    document.addEventListener('mouseover', function (e) {
      if (e.target.matches('input, textarea, select')) {
        document.body.classList.add('cursor-on-input');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.matches('input, textarea, select')) {
        document.body.classList.remove('cursor-on-input');
      }
    });

    /* Click feedback */
    document.addEventListener('mousedown', function () {
      dot.classList.add('is-clicking');
    });
    document.addEventListener('mouseup', function () {
      dot.classList.remove('is-clicking');
    });
  }

  /* ── requestAnimationFrame loop ── */
  function animate() {
    var lerp = reducedMotion ? 1 : CONFIG.lerpFactor;

    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;

    /* GPU-accelerated transform — no layout thrashing */
    dot.style.transform  = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0)';
    ring.style.transform = 'translate3d(' + ringX  + 'px,' + ringY  + 'px,0)';

    requestAnimationFrame(animate);
  }

  /* ── Initialise on DOM ready ── */
  function init() {
    create();
    bindEvents();
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
