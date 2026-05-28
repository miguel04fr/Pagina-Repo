/* ============================================================
   MARESME HOME CARE — script.js
   ============================================================ */

   (function () {
    'use strict';
  
    /* ---- AÑO FOOTER ---- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    /* ---- HEADER SCROLL ---- */
    const header = document.getElementById('header');
  
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  
    /* ---- MENÚ MÓVIL ---- */
    const menuToggle = document.getElementById('menuToggle');
    const nav        = document.getElementById('nav');
  
    menuToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  
    // Cerrar al hacer click en enlace
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  
    /* ---- SMOOTH SCROLL (anclas) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = header.offsetHeight + 8;
        const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  
    /* ---- REVEAL ON SCROLL ---- */
    const revealEls = document.querySelectorAll('.reveal, .fade-in');
  
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  
    /* ---- FAQ ACCORDION ---- */
    const faqItems = document.querySelectorAll('.faq-item');
  
    faqItems.forEach(function (item) {
      const btn    = item.querySelector('.faq-q');
      const answer = item.querySelector('.faq-a');
  
      btn.addEventListener('click', function () {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  
        // Cerrar todos
        faqItems.forEach(function (other) {
          const otherBtn = other.querySelector('.faq-q');
          const otherAns = other.querySelector('.faq-a');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.style.maxHeight = '0';
        });
  
        // Abrir el actual si estaba cerrado
        if (!isExpanded) {
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  
    /* ---- BOTÓN WA FLOTANTE: mostrar tras scroll ---- */
    const waFloat = document.querySelector('.wa-float');
    if (waFloat) {
      const toggleWa = function () {
        waFloat.style.opacity  = window.scrollY > 200 ? '1' : '0';
        waFloat.style.pointerEvents = window.scrollY > 200 ? 'auto' : 'none';
      };
      waFloat.style.transition = 'opacity 0.4s ease';
      waFloat.style.opacity = '0';
      waFloat.style.pointerEvents = 'none';
      window.addEventListener('scroll', toggleWa, { passive: true });
      toggleWa();
    }
  
  })();
  /* ---- MODO OSCURO ---- */
const themeToggle = document.getElementById('themeToggle');
const root        = document.documentElement;

// Recupera preferencia guardada o detecta la del sistema
const saved  = localStorage.getItem('mhc-theme');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initial = saved || system;
if (initial === 'dark') root.setAttribute('data-theme', 'dark');

themeToggle.addEventListener('click', function () {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('mhc-theme', next);
});