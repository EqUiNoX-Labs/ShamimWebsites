(function () {
  "use strict";

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.classList.add("reveal-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  function initHeaderScroll() {
    var nav = document.querySelector(".eca-nav");
    if (!nav) return;
    function update() {
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initCloseNavOnHash() {
    var el = document.getElementById("ecaNav");
    if (!el || typeof bootstrap === "undefined") return;
    el.querySelectorAll('a.nav-link[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function () {
        if (!window.matchMedia("(max-width: 991.98px)").matches) return;
        var c = bootstrap.Collapse.getOrCreateInstance(el);
        if (el.classList.contains("show")) c.hide();
      });
    });
  }

  function initHeroSlides() {
    var root = document.querySelector("[data-hero-slides]");
    if (!root) return;
    var slides = root.querySelectorAll(".hero-bg-slide");
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var index = 0;
    var intervalMs = 7000;
    var timer = null;

    function show(i) {
      slides.forEach(function (slide, j) {
        if (j === i) slide.classList.add("is-active");
        else slide.classList.remove("is-active");
      });
    }

    function advance() {
      index = (index + 1) % slides.length;
      show(index);
    }

    function start() {
      stop();
      timer = window.setInterval(advance, intervalMs);
    }

    function stop() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    start();
  }

  function initNavScrollSpy() {
    var nav = document.querySelector(".eca-nav-links");
    if (!nav) return;
    var links = nav.querySelectorAll('a.nav-link[href^="#"]');
    var entries = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      var el = document.getElementById(id.slice(1));
      if (el) entries.push({ link: a, el: el });
    });
    if (!entries.length) return;

    var header = document.querySelector(".eca-nav");
    var ticking = false;

    function activeId() {
      var doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 32) {
        return entries[entries.length - 1].el.id;
      }
      var offset = header ? header.offsetHeight + 16 : 80;
      var y = window.scrollY + offset;
      var best = entries[0];
      for (var i = 0; i < entries.length; i++) {
        var top = entries[i].el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) best = entries[i];
      }
      return best.el.id;
    }

    function paint() {
      var id = activeId();
      entries.forEach(function (e) {
        if (e.el.id === id) e.link.classList.add("eca-nav-link--active");
        else e.link.classList.remove("eca-nav-link--active");
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(paint);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initHeaderScroll();
    initCloseNavOnHash();
    initHeroSlides();
    initNavScrollSpy();
  });
})();
