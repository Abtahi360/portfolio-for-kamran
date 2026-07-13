/* ============================================================
   script.js — Broadcast Authority Portfolio
   News Presenter & Broadcast Journalist
   ============================================================ */

'use strict';

/* ============================================================
   1. THEME MANAGEMENT
   ============================================================ */
const ThemeManager = (() => {
  const root        = document.documentElement;
  const toggleBtn   = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolioTheme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update ARIA label
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  function toggleTheme() {
    const current = getTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    // Theme is already set by the inline script in <head>, but ensure
    // the toggle button's ARIA label is correct on load.
    applyTheme(getTheme());

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  }

  return { init };
})();


/* ============================================================
   2. NAVIGATION
   ============================================================ */
const NavManager = (() => {
  const nav          = document.getElementById('mainNav');
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobileNav');
  const backdrop     = document.getElementById('navBackdrop');
  const mobileLinks  = document.querySelectorAll('.nav__mobile-link');
  const navLinks     = document.querySelectorAll('.nav__link[data-section]');

  // ── Sticky shadow on scroll ──
  function updateNavScroll() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  // ── Mobile menu open / close ──
  function openMobileNav() {
    mobileNav.classList.add('is-open');
    backdrop.classList.add('is-visible');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus first link
    const firstLink = mobileNav.querySelector('.nav__mobile-link');
    if (firstLink) firstLink.focus();
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  // ── Active link highlight on scroll ──
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.dataset.section === current);
    });
  }

  function init() {
    // Scroll events
    window.addEventListener('scroll', () => {
      updateNavScroll();
      updateActiveLink();
    }, { passive: true });

    // Initial check
    updateNavScroll();
    updateActiveLink();

    // Hamburger toggle
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('is-open');
        if (isOpen) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    // Backdrop click closes nav
    if (backdrop) {
      backdrop.addEventListener('click', closeMobileNav);
    }

    // Mobile links close nav on click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Escape key closes mobile nav
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  return { init };
})();


/* ============================================================
   3. PROGRAMS TABS
   ============================================================ */
const ProgramsTabs = (() => {
  const tabs   = document.querySelectorAll('.programs__tab');
  const panels = document.querySelectorAll('.programs__panel');

  function activateTab(targetTab) {
    // Update tab states
    tabs.forEach(tab => {
      const isTarget = tab === targetTab;
      tab.classList.toggle('programs__tab--active', isTarget);
      tab.setAttribute('aria-selected', String(isTarget));
    });

    // Show matching panel, hide others
    const targetPanelId = targetTab.getAttribute('aria-controls');
    panels.forEach(panel => {
      const isTarget = panel.id === targetPanelId;
      panel.classList.toggle('programs__panel--active', isTarget);
      if (isTarget) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  function init() {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => activateTab(tab));

      // Keyboard: arrow keys for tab navigation
      tab.addEventListener('keydown', e => {
        const tabsArray = Array.from(tabs);
        const idx = tabsArray.indexOf(tab);

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = tabsArray[(idx + 1) % tabsArray.length];
          next.focus();
          activateTab(next);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = tabsArray[(idx - 1 + tabsArray.length) % tabsArray.length];
          prev.focus();
          activateTab(prev);
        }
      });
    });

    // Initialise — ensure the first panel is visible
    if (tabs.length > 0) {
      activateTab(tabs[0]);
    }
  }

  return { init };
})();


/* ============================================================
   4. GALLERY — FILTER + LIGHTBOX
   ============================================================ */
const Gallery = (() => {
  const filterBtns  = document.querySelectorAll('.gallery__filter-btn');
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox    = document.getElementById('lightbox');
  const lbBackdrop  = document.getElementById('lightboxBackdrop');
  const lbMedia     = document.getElementById('lightboxMedia');
  const lbClose     = document.getElementById('lightboxClose');
  const lbPrev      = document.getElementById('lightboxPrev');
  const lbNext      = document.getElementById('lightboxNext');

  let allItems     = [];
  let visibleItems = [];
  let currentIndex = 0;
  let lastFocused  = null;

  // ── Get all gallery items ──
  function refreshItems() {
    allItems = Array.from(galleryGrid.querySelectorAll('.gallery__item'));
    visibleItems = allItems.filter(item => !item.classList.contains('gallery__item--hidden'));
  }

  // ── Gallery Filter ──
  function applyFilter(filter) {
    allItems.forEach(item => {
      const cat = item.dataset.category;
      const show = filter === 'all' || cat === filter;
      item.classList.toggle('gallery__item--hidden', !show);
    });

    // Stagger visible items back in
    allItems
      .filter(item => !item.classList.contains('gallery__item--hidden'))
      .forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.04}s`;
      });

    refreshItems();
  }

  // ── Lightbox: Open ──
  function openLightbox(index) {
    lastFocused = document.activeElement;
    currentIndex = index;
    showLightboxItem(currentIndex);

    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Focus the close button
    setTimeout(() => {
      if (lbClose) lbClose.focus();
    }, 50);
  }

  // ── Lightbox: Show item ──
  function showLightboxItem(index) {
    const item = visibleItems[index];
    if (!item) return;

    const type = item.dataset.type;
    lbMedia.innerHTML = '';

    if (type === 'video') {
      const src = item.dataset.videoSrc;
      // Add autoplay param for embedded playback
      const autoSrc = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
      const iframe = document.createElement('iframe');
      iframe.src = autoSrc;
      iframe.title = 'Video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      lbMedia.appendChild(iframe);
    } else {
      // Image
      const img = item.querySelector('.gallery__img');
      if (img) {
        const el = document.createElement('img');
        el.src = img.src;
        el.alt = img.alt || 'Gallery image';
        lbMedia.appendChild(el);
      }
    }

    // Update nav button states
    if (lbPrev) lbPrev.disabled = false;
    if (lbNext) lbNext.disabled = false;
    if (lbPrev) lbPrev.style.opacity = index === 0 ? '0.35' : '1';
    if (lbNext) lbNext.style.opacity = index === visibleItems.length - 1 ? '0.35' : '1';
  }

  // ── Lightbox: Close ──
  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    lbMedia.innerHTML = ''; // Stop video playback

    // Return focus
    if (lastFocused) lastFocused.focus();
  }

  // ── Lightbox: Navigate ──
  function navigateLightbox(direction) {
    const next = currentIndex + direction;
    if (next < 0 || next >= visibleItems.length) return;
    currentIndex = next;
    showLightboxItem(currentIndex);
  }

  // ── Trap focus in lightbox ──
  function trapFocus(e) {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;
    const focusable = lightbox.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  function init() {
    if (!galleryGrid) return;

    refreshItems();

    // ── Filter button clicks ──
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
        btn.classList.add('gallery__filter-btn--active');
        applyFilter(btn.dataset.filter);
      });
    });

    // ── Lightbox triggers — all item buttons ──
    galleryGrid.addEventListener('click', e => {
      const btn = e.target.closest('[data-lightbox]');
      if (!btn) return;

      const item = btn.closest('.gallery__item');
      if (!item) return;

      refreshItems(); // ensure visibleItems is current
      const index = visibleItems.indexOf(item);
      if (index !== -1) openLightbox(index);
    });

    // ── Lightbox controls ──
    if (lbClose)   lbClose.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    if (lbPrev)    lbPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lbNext)    lbNext.addEventListener('click', () => navigateLightbox(1));

    // ── Keyboard controls ──
    document.addEventListener('keydown', e => {
      if (!lightbox || lightbox.hasAttribute('hidden')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
        default:
          trapFocus(e);
      }
    });
  }

  return { init };
})();


/* ============================================================
   5. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
const ScrollReveal = (() => {
  function init() {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealEls = document.querySelectorAll('.reveal');

    // Stagger siblings that share the same parent container
    const processed = new Set();
    revealEls.forEach(el => {
      const parent = el.parentElement;
      if (processed.has(parent)) return;

      const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
      if (siblings.length > 1) {
        siblings.forEach((sib, i) => {
          sib.style.setProperty('--reveal-delay', `${i * 0.1}s`);
        });
        processed.add(parent);
      }
    });

    // Observer config — trigger when 15% of the element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  return { init };
})();


/* ============================================================
   6. CONTACT FORM VALIDATION
   ============================================================ */
const ContactForm = (() => {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('contactSubmit');
  const successMsg = document.getElementById('formSuccess');

  const fields = {
    name:    { el: document.getElementById('contactName'),    errEl: document.getElementById('nameError'),    label: 'Full name' },
    email:   { el: document.getElementById('contactEmail'),   errEl: document.getElementById('emailError'),   label: 'Email address' },
    subject: { el: document.getElementById('contactSubject'), errEl: document.getElementById('subjectError'), label: 'Subject' },
    message: { el: document.getElementById('contactMessage'), errEl: document.getElementById('messageError'), label: 'Message' },
  };

  function showError(field, msg) {
    if (!field.errEl) return;
    field.errEl.textContent = msg;
    if (field.el) field.el.classList.add('is-error');
  }

  function clearError(field) {
    if (!field.errEl) return;
    field.errEl.textContent = '';
    if (field.el) field.el.classList.remove('is-error');
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    let valid = true;

    Object.entries(fields).forEach(([key, field]) => {
      clearError(field);
      if (!field.el) return;

      const value = field.el.value.trim();

      if (!value) {
        showError(field, `${field.label} is required.`);
        valid = false;
        return;
      }

      if (key === 'email' && !validateEmail(value)) {
        showError(field, 'Please enter a valid email address.');
        valid = false;
        return;
      }

      if (key === 'message' && value.length < 20) {
        showError(field, 'Please write a message of at least 20 characters.');
        valid = false;
        return;
      }
    });

    return valid;
  }

  // Clear individual field errors on input
  function bindLiveValidation() {
    Object.values(fields).forEach(field => {
      if (!field.el) return;
      field.el.addEventListener('input', () => {
        if (field.el.classList.contains('is-error')) {
          clearError(field);
        }
      });
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      // Focus the first invalid field
      const firstInvalid = Object.values(fields).find(f => f.el && f.el.classList.contains('is-error'));
      if (firstInvalid && firstInvalid.el) firstInvalid.el.focus();
      return;
    }

    // Disable button during simulated submission
    if (submitBtn) {
      submitBtn.disabled  = true;
      submitBtn.textContent = 'Sending…';
    }

    // Simulate async submission — replace with actual fetch() when backend is ready
    setTimeout(() => {
      if (form) form.reset();
      Object.values(fields).forEach(clearError);

      if (submitBtn) {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message';
      }

      if (successMsg) {
        successMsg.removeAttribute('hidden');
        successMsg.focus();
        setTimeout(() => successMsg.setAttribute('hidden', ''), 6000);
      }
    }, 1200);
  }

  function init() {
    if (!form) return;
    bindLiveValidation();
    form.addEventListener('submit', handleSubmit);
  }

  return { init };
})();


/* ============================================================
   7. IMAGE ERROR HANDLING
   ============================================================ */
const ImageFallbacks = (() => {
  function handleHeroImage() {
    const img = document.getElementById('heroImage');
    if (!img) return;

    function onError() {
      img.classList.add('is-error');
      // Inject placeholder text into the frame (the gradient bg shows through)
      const frame = document.getElementById('heroFrame');
      if (frame && !frame.querySelector('.hero__frame-placeholder-text')) {
        const text = document.createElement('div');
        text.className = 'hero__frame-placeholder-text';
        text.textContent = 'Profile Photo · assets/profile-news-presenter.jpg';
        frame.appendChild(text);
      }
    }

    // Check if already failed (cached broken img)
    if (img.complete && img.naturalWidth === 0) {
      onError();
    } else {
      img.addEventListener('error', onError, { once: true });
    }
  }

  function handleCardImages() {
    // Achievement card images
    document.querySelectorAll('.achievement-card__image').forEach(img => {
      function onError() {
        img.classList.add('is-error');
        const fallback = img.closest('.achievement-card__visual')
                            ?.querySelector('.achievement-card__img-fallback');
        if (fallback) fallback.style.display = 'flex';
      }
      if (img.complete && img.naturalWidth === 0) {
        onError();
      } else {
        img.addEventListener('error', onError, { once: true });
      }
    });

    // Training card certificate images
    document.querySelectorAll('.training-card__cert-img').forEach(img => {
      function onError() {
        img.classList.add('is-error');
        const fallback = img.closest('.training-card__cert')
                            ?.querySelector('.training-card__cert-fallback');
        if (fallback) fallback.style.display = 'flex';
      }
      if (img.complete && img.naturalWidth === 0) {
        onError();
      } else {
        img.addEventListener('error', onError, { once: true });
      }
    });

    // Gallery images
    document.querySelectorAll('.gallery__img').forEach(img => {
      function onError() {
        img.classList.add('is-error');
        const fallback = img.closest('.gallery__item-inner')
                            ?.querySelector('.gallery__img-fallback');
        if (fallback) fallback.style.display = 'flex';
      }
      if (img.complete && img.naturalWidth === 0) {
        onError();
      } else {
        img.addEventListener('error', onError, { once: true });
      }
    });
  }

  function init() {
    handleHeroImage();
    handleCardImages();
  }

  return { init };
})();


/* ============================================================
   8. SMOOTH ANCHOR SCROLL
      (CSS scroll-behavior handles most cases, but this gives
       precise offset control for the sticky nav.)
   ============================================================ */
const SmoothScroll = (() => {
  function getNavHeight() {
    const nav = document.getElementById('mainNav');
    return nav ? nav.offsetHeight : 68;
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - getNavHeight();
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();
        scrollToSection(id);

        // Update URL without jump
        if (history.pushState) {
          history.pushState(null, '', href);
        }
      });
    });
  }

  return { init };
})();


/* ============================================================
   9. TICKER — pause animation on hover / focus for a11y
   ============================================================ */
const Ticker = (() => {
  function init() {
    const ticker = document.querySelector('.hero__ticker');
    const tape   = document.querySelector('.hero__ticker-tape');
    if (!ticker || !tape) return;

    ticker.addEventListener('mouseenter', () => {
      tape.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      tape.style.animationPlayState = 'running';
    });
  }

  return { init };
})();


/* ============================================================
   10. FOOTER — Current year
   ============================================================ */
function setFooterYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}


/* ============================================================
   11. INIT — Run everything on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
  ProgramsTabs.init();
  Gallery.init();
  ScrollReveal.init();
  ContactForm.init();
  ImageFallbacks.init();
  SmoothScroll.init();
  Ticker.init();
  setFooterYear();

  // Hero entry — trigger immediately (not IntersectionObserver based)
  // The hero content animates via CSS keyframes on load.

  // Announce page readiness to screen readers
  const main = document.getElementById('main');
  if (main) main.setAttribute('tabindex', '-1');
});
