/* Jaipur Vibes - shared site script (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Settings from js/config.js ---------- */
  var cfg = window.JV_CONFIG || {};
  var wa = cfg.whatsapp || {};
  var WA_NUMBER = String(wa.number || '919352203891').replace(/\D/g, '');
  var WA_MESSAGE = wa.message || 'Hello Jaipur Vibes, I would like to enquire about your products.';
  function waUrl(msg) { return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg || WA_MESSAGE); }

  var ICONS = {
    whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.351-.2 6.78-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICONS[name] + '"/></svg>';
  }

  /* ---------- WhatsApp: every wa.me link uses the number and message in config.js ---------- */
  $$('a[href^="https://wa.me/"]').forEach(function (a) {
    a.href = waUrl(a.getAttribute('data-wa-msg'));
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  /* Floating WhatsApp button: added automatically on any page that does not already include it */
  if (!$('.wa-float')) {
    var fab = document.createElement('a');
    fab.className = 'wa-float';
    fab.href = waUrl();
    fab.target = '_blank';
    fab.rel = 'noopener noreferrer';
    fab.setAttribute('aria-label', 'Chat with us on WhatsApp');
    fab.innerHTML = icon('whatsapp') + '<span aria-hidden="true">Chat with us</span>';
    document.body.appendChild(fab);
  }

  /* ---------- Social links: shown only when a real https URL is set in config.js ---------- */
  var social = cfg.social || {};
  $$('[data-social]').forEach(function (a) {
    var u = social[a.dataset.social];
    if (u && /^https:\/\//.test(u)) { a.href = u; a.hidden = false; }
  });
  $$('[data-social-slot]').forEach(function (slot) {
    ['instagram', 'facebook', 'youtube'].forEach(function (k) {
      var u = social[k];
      if (!u || !/^https:\/\//.test(u)) return;
      var a = document.createElement('a');
      a.className = 'soc soc-' + k;
      a.href = u;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'Jaipur Vibes on ' + k.charAt(0).toUpperCase() + k.slice(1));
      a.innerHTML = icon(k);
      slot.appendChild(a);
    });
  });

  /* ---------- Header, mobile menu, collections dropdown ---------- */
  var header = $('.site-header');
  var toggle = $('.nav-toggle');
  var nav = $('#nav');
  var subBtn = $('.sub-btn');
  var subWrap = subBtn ? subBtn.parentNode : null;

  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  function setSub(open) {
    if (!subWrap) return;
    subWrap.classList.toggle('open', open);
    subBtn.setAttribute('aria-expanded', String(open));
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  if (subBtn) subBtn.addEventListener('click', function () { setSub(!subWrap.classList.contains('open')); });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('click', function (e) {
    if (subWrap && !subWrap.contains(e.target)) setSub(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setMenu(false);
    setSub(false);
    closeLightbox();
  });

  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Gallery filter + lightbox (used on gallery.html) ---------- */
  var gallery = $('#gal');
  var lb, items = [], current = 0, lastTrigger = null;

  function visibleItems() { return items.filter(function (a) { return a.style.display !== 'none'; }); }
  function showImage(k) {
    var v = visibleItems();
    if (!v.length) return;
    current = (k + v.length) % v.length;
    var a = v[current], img = $('img', lb);
    img.src = a.href;
    img.alt = $('img', a).alt;
    $('figcaption', lb).textContent = a.dataset.cap || '';
    lb.classList.add('on');
    setTimeout(function () { $('.x', lb).focus(); }, 50);
  }
  function closeLightbox() {
    if (lb && lb.classList.contains('on')) {
      lb.classList.remove('on');
      if (lastTrigger) lastTrigger.focus();
    }
  }
  if (gallery) {
    items = $$('.gitem', gallery);
    var chips = $$('.chip');
    if (chips[0]) chips[0].setAttribute('aria-pressed', 'true');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', 'true');
        items.forEach(function (a) {
          a.style.display = (c.dataset.f === 'all' || a.dataset.c === c.dataset.f) ? '' : 'none';
        });
      });
    });
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = '<button class="x" aria-label="Close">&times;</button>' +
      '<button class="p" aria-label="Previous image">&#8249;</button>' +
      '<figure><img alt="" width="600" height="800"><figcaption></figcaption></figure>' +
      '<button class="n" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(lb);
    items.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lastTrigger = a;
        showImage(visibleItems().indexOf(a));
      });
    });
    $('.x', lb).onclick = closeLightbox;
    $('.p', lb).onclick = function () { showImage(current - 1); };
    $('.n', lb).onclick = function () { showImage(current + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'ArrowLeft') showImage(current - 1);
      if (e.key === 'ArrowRight') showImage(current + 1);
    });
  }
})();
