
(
  function () {
  'use strict';

  var D = window.PORTFOLIO_DATA;

  /* ---------- Helpers ---------- */
  function showFatal(msg) {
    var bar = document.createElement('div');
    bar.setAttribute('role', 'alert');
    bar.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:#b00020;color:#fff;padding:12px 16px;font:14px/1.5 sans-serif';
    bar.textContent = msg;
    document.body.appendChild(bar);
  }

  if (!D) {
    showFatal('js/data.js লোড হয়নি বা তাতে ভুল আছে (কমা / কোটেশন চেক করুন)। বিস্তারিত দেখতে F12 চেপে Console খুলুন।');
    return;
  }

  function warn(msg) { if (window.console) console.warn('[portfolio data] ' + msg); }

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Join list items with a visual separator, e.g. "A · B · C" */
  function joinDots(arr) { return (arr || []).map(esc).join(' &nbsp;·&nbsp; '); }

  /* "photo.jpg" -> "assets/images/<folder>/photo.jpg"; full paths / URLs are kept as-is */
  function imgPath(file, folder) {
    file = String(file || '').trim();
    if (!file) return '';
    if (/^(https?:)?\/\//i.test(file) || file.indexOf('/') !== -1) return file;
    return 'assets/images/' + folder + '/' + file;
  }

  function list(v) { return Array.isArray(v) ? v : []; }

  /* ---------- Video link helper (YouTube / Facebook) ---------- */
  function videoInfo(link, platformHint) {
    link = String(link || '').trim();
    var platform = platformHint ? String(platformHint).toLowerCase()
                 : (/facebook\.com|fb\.watch/i.test(link) ? 'facebook' : 'youtube');
    if (!link) return { platform: platform, src: '' };

    if (platform === 'facebook') {
      var fbSrc = /facebook\.com\/plugins\/video\.php/i.test(link)
        ? link
        : 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(link) + '&show_text=false';
      return { platform: 'facebook', src: fbSrc };
    }

    if (/youtube(-nocookie)?\.com\/embed\//i.test(link)) return { platform: 'youtube', src: link };
    var m = link.match(/[?&]v=([\w-]{11})/) ||
            link.match(/youtu\.be\/([\w-]{11})/) ||
            link.match(/youtube\.com\/(?:shorts|live)\/([\w-]{11})/) ||
            link.match(/^([\w-]{11})$/);
    if (m) return { platform: 'youtube', src: 'https://www.youtube.com/embed/' + m[1] };
    warn('ভিডিও লিংক চেনা যায়নি: ' + link);
    return { platform: 'youtube', src: link };
  }

  /* ---------- SVG icons (copied verbatim from the original design) ---------- */
  var SVG = {
    download15: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    file15: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    fbPlaceholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
    award: '<svg viewBox="0 0 48 56" fill="none" width="36" height="42"><path d="M24 4L29.5 16H43L32.5 24.5L37 38L24 30L11 38L15.5 24.5L5 16H18.5L24 4Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><line x1="24" y1="38" x2="24" y2="48" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="48" x2="34" y2="48" stroke="currentColor" stroke-width="1.5"/></svg>',
    cert: '<svg viewBox="0 0 60 44" fill="none" width="44" height="32"><rect x="1" y="1" width="58" height="42" rx="3" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="14" x2="50" y2="14" stroke="currentColor" stroke-width="1"/><line x1="10" y1="21" x2="40" y2="21" stroke="currentColor" stroke-width="1"/><line x1="10" y1="28" x2="35" y2="28" stroke="currentColor" stroke-width="1"/><circle cx="47" cy="31" r="7" stroke="currentColor" stroke-width="1.5"/><polyline points="43.5 31 46 33.5 50.5 28" stroke="currentColor" stroke-width="1.2"/></svg>',
    galleryFallback: '<svg viewBox="0 0 60 40" fill="none" width="32" height="22"><rect x="1" y="1" width="58" height="38" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="16" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M1 35 L25 22 L40 30 L50 24 L59 30" stroke="currentColor" stroke-width="1.5"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    play: '<svg class="gallery__play-icon" viewBox="0 0 24 24" fill="currentColor" width="44" height="44" aria-hidden="true"><circle cx="12" cy="12" r="12" opacity="0.25"/><polygon points="10 7.5 17.5 12 10 16.5 10 7.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.46-1.46a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };

  var SKILL_ICONS = {
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
  };

  var SOCIAL = {
    linkedin: { label: 'LinkedIn', aria: 'LinkedIn profile', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
    facebook: { label: 'Facebook', aria: 'Facebook profile', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
    youtube: { label: 'YouTube', aria: 'YouTube channel', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
    x: { label: 'X (Twitter)', aria: 'X (Twitter) profile', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' }
  };

  /* ---------- Resume buttons (same file used everywhere) ---------- */
  function resume() {
    var r = (D.profile && D.profile.resume) || {};
    return { file: esc(r.file || 'assets/documents/resume.pdf'), dl: esc(r.downloadName || 'Resume.pdf') };
  }

  /* ============================================================
     RENDERERS  (key = value of data-render="..." in index.html)
     Each receives the mount element and fills it.
  ============================================================ */
  var R = {};

  /* ---- Nav brand ---- */
  R.navBrand = function (el) {
    var p = D.profile;
    el.setAttribute('aria-label', p.name + ' \u2013 Home');
    el.innerHTML =
      '<span class="nav__brand-initials">' + esc(p.initials) + '</span>' +
      '<div class="nav__brand-text">' +
        '<span class="nav__brand-name">' + esc(p.name) + '</span>' +
        '<span class="nav__brand-role">' + esc(p.navRole) + '</span>' +
      '</div>';
  };

  /* ---- Hero ---- */
  R.heroContent = function (el) {
    var p = D.profile, h = D.hero, r = resume();
    el.innerHTML =
      '<span class="hero__slug">' + joinDots(h.slug) + '</span>' +
      '<h1 class="hero__name">' + list(h.nameLines).map(esc).join('<br>') + '</h1>' +
      '<div class="hero__chyron" aria-label="Professional title">' +
        '<span class="hero__chyron-accent" aria-hidden="true"></span>' +
        '<div class="hero__chyron-inner">' +
          '<span class="hero__chyron-primary">' + esc(p.jobTitle) + '</span>' +
          '<span class="hero__chyron-secondary">' + joinDots(h.chyronSecondary) + '</span>' +
        '</div>' +
      '</div>' +
      '<p class="hero__statement">' + esc(h.statement) + '</p>' +
      '<div class="hero__cta" role="group" aria-label="Primary actions">' +
        '<a href="#programs" class="btn btn--primary">View Programs</a>' +
        '<a href="' + r.file + '" download="' + r.dl + '" class="btn btn--secondary">' + SVG.download15 + ' Download Resume</a>' +
        '<a href="' + r.file + '" target="_blank" rel="noopener noreferrer" class="btn btn--outline">' + SVG.file15 + ' View Resume</a>' +
      '</div>';
  };

  R.ticker = function (el) {
    var one = list(D.ticker).map(function (t) { return esc(t) + ' &nbsp;&nbsp;·&nbsp;&nbsp; '; }).join('');
    el.innerHTML = one + one; /* duplicated for seamless infinite-scroll loop */
  };

  /* ---- About ---- */
  R.aboutSidebar = function (el) {
    var a = D.about, r = resume();
    el.innerHTML =
      '<div class="about__profile-card">' +
        '<span class="about__profile-accent" aria-hidden="true"></span>' +
        '<div class="about__profile-body">' +
          '<span class="about__profile-name">' + esc(D.profile.name) + '</span>' +
          '<span class="about__profile-role">' + esc(a.role) + '</span>' +
          '<span class="about__profile-since">' + esc(a.since) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="about__stats">' +
        list(a.stats).map(function (s) {
          return '<div class="about__stat"><span class="about__stat-number">' + esc(s.number) + '</span>' +
                 '<span class="about__stat-label">' + esc(s.label) + '</span></div>';
        }).join('') +
      '</div>' +
      '<div class="about__sidebar-cta">' +
        '<a href="' + r.file + '" download="' + r.dl + '" class="btn btn--secondary btn--sm">Download Resume</a>' +
        '<a href="' + r.file + '" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--sm">View Resume</a>' +
      '</div>';
  };

  R.aboutContent = function (el) {
    var a = D.about, paras = list(a.paragraphs);
    el.innerHTML =
      '<p class="about__lead">' + esc(a.lead) + '</p>' +
      (paras[0] != null ? '<p class="about__body">' + esc(paras[0]) + '</p>' : '') +
      (a.quote ? '<blockquote class="about__quote">"' + esc(a.quote) + '"</blockquote>' : '') +
      paras.slice(1).map(function (t) { return '<p class="about__body">' + esc(t) + '</p>'; }).join('') +
      '<div class="about__points">' +
        list(a.points).map(function (t) {
          return '<div class="about__point"><span class="about__point-dot" aria-hidden="true"></span><span>' + esc(t) + '</span></div>';
        }).join('') +
      '</div>';
  };

  /* ---- Programs (tabs + panels, grouped by category) ---- */
  function categoryIndex() {
    return list(D.programCategories);
  }

  /* Accept "sports", "Sports", " SPORTS " ... (matches id or label) */
  function findCategory(value) {
    var v = String(value || '').trim().toLowerCase();
    var cats = categoryIndex();
    for (var i = 0; i < cats.length; i++) {
      if (String(cats[i].id).toLowerCase() === v || String(cats[i].label).toLowerCase() === v) return cats[i];
    }
    return null;
  }

  R.programTabs = function (el) {
    el.innerHTML = categoryIndex().map(function (c, i) {
      var active = i === 0;
      return '<button class="programs__tab' + (active ? ' programs__tab--active' : '') + '" role="tab" aria-selected="' + active +
             '" aria-controls="panel-' + esc(c.id) + '" data-tab="' + esc(c.id) + '">' + esc(c.label) + '</button>';
    }).join('');
  };

  function videoCard(p, cat) {
    var v = videoInfo(p.link, p.platform);
    var isFb = v.platform === 'facebook';
    var embed;
    if (!v.src) {
      embed = '<div class="video-card__embed-wrap video-card__embed-wrap--placeholder">' +
        '<div class="embed-placeholder" aria-label="' + (isFb ? 'Facebook' : 'YouTube') + ' video placeholder">' +
          SVG.fbPlaceholder + '<span>' + (isFb ? 'Facebook' : 'YouTube') + ' Video</span>' +
          '<small>Replace this block with your ' + (isFb ? 'Facebook' : 'YouTube') + ' embed code</small>' +
        '</div></div>';
    } else if (isFb) {
      embed = '<div class="video-card__embed-wrap"><iframe src="' + esc(v.src) + '" title="' + esc(p.title) + '" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" loading="lazy"></iframe></div>';
    } else {
      embed = '<div class="video-card__embed-wrap"><iframe src="' + esc(v.src) + '" title="' + esc(p.title) +
        '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe></div>';
    }
    return '<article class="video-card">' + embed +
      '<div class="video-card__info">' +
        '<div class="video-card__meta">' +
          '<span class="video-card__category">' + esc(cat.label) + '</span>' +
          '<span class="video-card__platform video-card__platform--' + v.platform + '">' + (isFb ? 'Facebook' : 'YouTube') + '</span>' +
        '</div>' +
        '<h3 class="video-card__title">' + esc(p.title) + '</h3>' +
        '<p class="video-card__desc">' + esc(p.desc) + '</p>' +
        '<span class="video-card__date">' + esc(p.date) + '</span>' +
      '</div></article>';
  }

  R.programPanels = function (el) {
    var cats = categoryIndex();
    var buckets = {};
    cats.forEach(function (c) { buckets[c.id] = []; });
    list(D.programs).forEach(function (p, i) {
      var c = findCategory(p.category);
      if (!c) {
        warn('programs[' + i + '] ("' + p.title + '"): category "' + p.category + '" পাওয়া যায়নি — "others" এ দেখানো হচ্ছে।');
        c = findCategory('others') || cats[cats.length - 1];
        if (!c) return;
      }
      buckets[c.id].push(videoCard(p, c));
    });
    el.innerHTML = cats.map(function (c, i) {
      var active = i === 0;
      return '<div class="programs__panel' + (active ? ' programs__panel--active' : '') + '" id="panel-' + esc(c.id) +
        '" role="tabpanel" aria-label="' + esc(c.panelLabel || (c.label + ' programs')) + '"' + (active ? '' : ' hidden') + '>' +
        '<div class="programs__grid">' + buckets[c.id].join('') + '</div></div>';
    }).join('');
  };

  /* ---- Experience ---- */
  R.experience = function (el) {
    el.innerHTML = list(D.experience).map(function (e) {
      return '<article class="timeline__item reveal">' +
        '<div class="timeline__marker" aria-hidden="true"><span class="timeline__dot"></span></div>' +
        '<div class="timeline__body">' +
          '<div class="timeline__header">' +
            '<div class="timeline__title-group">' +
              '<h3 class="timeline__role">' + esc(e.role) + '</h3>' +
              '<span class="timeline__org">' + esc(e.org) + '</span>' +
            '</div>' +
            '<span class="timeline__period">' + esc(e.period) + '</span>' +
          '</div>' +
          '<p class="timeline__desc">' + esc(e.desc) + '</p>' +
          '<ul class="timeline__responsibilities">' + list(e.responsibilities).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="timeline__tags">' + list(e.tags).map(function (t) { return '<span class="timeline__tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div></article>';
    }).join('');
  };

  /* ---- Skills ---- */
  R.skills = function (el) {
    el.innerHTML = list(D.skills).map(function (s) {
      var icon = SKILL_ICONS[s.icon] || SKILL_ICONS.target;
      return '<div class="skills__category reveal">' +
        '<div class="skills__cat-header"><span class="skills__cat-icon" aria-hidden="true">' + icon + '</span>' +
        '<h3 class="skills__cat-title">' + esc(s.title) + '</h3></div>' +
        '<div class="skills__tags">' + list(s.tags).map(function (t) { return '<span class="skill-tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>';
    }).join('');
  };

  /* ---- Achievements ---- */
  R.achievements = function (el) {
    el.innerHTML = list(D.achievements).map(function (a) {
      return '<article class="achievement-card reveal">' +
        '<div class="achievement-card__visual">' +
          '<img src="' + esc(imgPath(a.image, 'achievements')) + '" alt="' + esc(a.imageAlt || a.title) + '" class="achievement-card__image" loading="lazy">' +
          '<div class="achievement-card__img-fallback" aria-hidden="true">' + SVG.award + '</div>' +
          '<span class="achievement-card__year">' + esc(a.year) + '</span>' +
        '</div>' +
        '<div class="achievement-card__body">' +
          '<span class="achievement-card__category">' + esc(a.category) + '</span>' +
          '<h3 class="achievement-card__title">' + esc(a.title) + '</h3>' +
          '<span class="achievement-card__org">' + esc(a.org) + '</span>' +
          '<p class="achievement-card__desc">' + esc(a.desc) + '</p>' +
        '</div></article>';
    }).join('');
  };

  /* ---- Training ---- */
  R.training = function (el) {
    el.innerHTML = list(D.training).map(function (t) {
      return '<article class="training-card reveal">' +
        '<div class="training-card__cert">' +
          '<img src="' + esc(imgPath(t.image, 'certificates')) + '" alt="' + esc(t.imageAlt || t.title) + '" class="training-card__cert-img" loading="lazy">' +
          '<div class="training-card__cert-fallback" aria-hidden="true">' + SVG.cert + '</div>' +
        '</div>' +
        '<div class="training-card__body">' +
          '<span class="training-card__date">' + esc(t.date) + '</span>' +
          '<h3 class="training-card__title">' + esc(t.title) + '</h3>' +
          '<span class="training-card__institution">' + esc(t.institution) + '</span>' +
          '<p class="training-card__desc">' + esc(t.desc) + '</p>' +
          '<ul class="training-card__points">' + list(t.points).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '</div></article>';
    }).join('');
  };

  /* ---- Gallery ---- */
  R.galleryFilters = function (el) {
    var html = '<button class="gallery__filter-btn gallery__filter-btn--active" data-filter="all">All</button>';
    html += list(D.galleryCategories).map(function (c) {
      return '<button class="gallery__filter-btn" data-filter="' + esc(c.id) + '">' + esc(c.filter) + '</button>';
    }).join('');
    el.innerHTML = html;
  };

  R.galleryGrid = function (el) {
    var cats = {};
    list(D.galleryCategories).forEach(function (c) { cats[String(c.id).toLowerCase()] = c; });
    el.innerHTML = list(D.gallery).map(function (g, i) {
      var key = String(g.category || '').trim().toLowerCase();
      var c = cats[key];
      if (!c) { warn('gallery[' + i + ']: category "' + g.category + '" পাওয়া যায়নি।'); c = { id: key, tag: g.category }; }
      var isVideo = !!String(g.link || '').trim();
      var aria = g.ariaLabel || (isVideo ? 'Play video reel' : 'View ' + String(g.alt || '').toLowerCase() + ' photo');
      var vsrc = isVideo ? videoInfo(g.link).src : '';
      return '<div class="gallery__item" data-category="' + esc(c.id) + '" data-type="' + (isVideo ? 'video' : 'image') + '"' +
          (isVideo ? ' data-video-src="' + esc(vsrc) + '"' : '') + ' data-index="' + i + '" role="listitem">' +
        '<button class="gallery__item-btn" aria-label="' + esc(aria) + '" data-lightbox>' +
          '<div class="gallery__item-inner' + (isVideo ? ' gallery__item-inner--video' : '') + '">' +
            '<img src="' + esc(imgPath(g.image, 'gallery')) + '" alt="' + esc(g.alt) + '" class="gallery__img" loading="lazy">' +
            '<div class="gallery__img-fallback" aria-hidden="true">' + SVG.galleryFallback + '<span>' + esc(c.tag) + '</span></div>' +
            '<div class="gallery__overlay' + (isVideo ? ' gallery__overlay--video' : '') + '">' +
              '<span class="gallery__overlay-cat">' + esc(c.tag) + '</span>' + (isVideo ? SVG.play : SVG.expand) +
            '</div>' +
          '</div>' +
        '</button></div>';
    }).join('');
  };

  /* ---- Contact ---- */
  R.contactInfo = function (el) {
    var c = D.contact, r = resume();
    var tel = 'tel:' + String(c.phone || '').replace(/[^\d+]/g, '');
    function item(icon, label, valueHtml) {
      return '<div class="contact__info-item"><span class="contact__info-icon" aria-hidden="true">' + icon + '</span>' +
             '<div><span class="contact__info-label">' + label + '</span>' + valueHtml + '</div></div>';
    }
    var social = ['linkedin', 'facebook', 'youtube', 'x'].map(function (k) {
      var url = (c.social || {})[k];
      if (url == null || String(url).trim() === '') return '';
      var s = SOCIAL[k];
      return '<a href="' + esc(url) + '" class="contact__social-link" aria-label="' + s.aria + '">' + s.svg + ' ' + s.label + '</a>';
    }).join('');
    el.innerHTML =
      '<div class="contact__info-items">' +
        item(SVG.mail, 'Email', '<a href="mailto:' + esc(c.email) + '" class="contact__info-value">' + esc(c.email) + '</a>') +
        item(SVG.phone, 'Phone', '<a href="' + esc(tel) + '" class="contact__info-value">' + esc(c.phone) + '</a>') +
        item(SVG.pin, 'Location', '<span class="contact__info-value">' + esc(c.location) + '</span>') +
      '</div>' +
      '<div class="contact__social"><h3 class="contact__social-heading">Connect</h3><div class="contact__social-links">' + social + '</div></div>' +
      '<div class="contact__resume-cta">' +
        '<a href="' + r.file + '" download="' + r.dl + '" class="btn btn--secondary">Download Resume</a>' +
        '<a href="' + r.file + '" target="_blank" rel="noopener noreferrer" class="btn btn--outline">View Resume</a>' +
      '</div>';
  };

  /* ---- Footer ---- */
  R.footerBrand = function (el) {
    el.innerHTML =
      '<span class="footer__brand-name">' + esc(D.profile.name) + '</span>' +
      '<span class="footer__brand-role">' + esc(D.profile.jobTitle) + '</span>' +
      '<p class="footer__brand-tag">' + esc(D.footer.tagline) + '</p>';
  };
  R.footerActions = function (el) {
    var r = resume();
    el.innerHTML = '<a href="' + r.file + '" download="' + r.dl + '" class="btn btn--outline btn--sm">Download Resume</a>';
  };
  R.footerCopy = function (el) {
    /* #currentYear is filled by app.js */
    el.innerHTML = '\u00a9 <span id="currentYear"></span> ' + esc(D.profile.name) + '. All rights reserved.';
  };

  /* ---------- Run all renderers ---------- */
  function run() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-render]'), function (el) {
      var key = el.getAttribute('data-render');
      if (!R[key]) { warn('অজানা data-render: ' + key); return; }
      try { R[key](el); }
      catch (err) {
        if (window.console) console.error('[portfolio data] "' + key + '" সেকশনে সমস্যা — data.js এ ওই অংশটা দেখুন:', err);
        showFatal('"' + key + '" সেকশনের তথ্যে ভুল আছে (js/data.js)। F12 → Console দেখুন।');
      }
    });
  }

  run();

  /* YouTube ভিডিও file:// (ডাবল-ক্লিক) থেকে খুললে Error 153 দেয় — এটা YouTube-এর নিয়ম, কোডের সমস্যা নয়। */
  if (location.protocol === 'file:' && window.console) {
    console.info('[portfolio] ফাইলটা ডাবল-ক্লিক (file://) করে খুলেছেন, তাই YouTube ভিডিওতে "Error 153" আসবে। ' +
      'ভিডিও দেখতে VS Code এর "Live Server" দিয়ে খুলুন, অথবা সাইটটা Vercel-এ পাবলিশ করে সেখান থেকে দেখুন।');
  }
}());
