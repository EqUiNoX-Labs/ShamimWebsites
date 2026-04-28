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

  function initBeforeAfter() {
    var wrap = document.querySelector("[data-before-after]");
    if (!wrap) return;

    var range = wrap.querySelector(".ba-range");
    if (!range) return;

    var dragging = false;

    function setSplit(pct) {
      var v = Math.max(0, Math.min(100, pct));
      wrap.style.setProperty("--split", v + "%");
      range.value = String(Math.round(v));
    }

    function fromClientX(clientX) {
      var rect = wrap.getBoundingClientRect();
      if (rect.width <= 0) return 50;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    range.addEventListener("input", function () {
      wrap.classList.remove("is-transitioning");
      setSplit(parseFloat(range.value, 10));
    });

    range.addEventListener("mousedown", function () {
      dragging = true;
      wrap.classList.remove("is-transitioning");
    });

    range.addEventListener("mouseup", function () {
      dragging = false;
    });

    range.addEventListener("touchstart", function () {
      wrap.classList.remove("is-transitioning");
    }, { passive: true });

    wrap.addEventListener("click", function (e) {
      if (e.target === range) return;
      wrap.classList.add("is-transitioning");
      setSplit(fromClientX(e.clientX));
    });

    document.addEventListener("mouseup", function () {
      dragging = false;
    });

    setSplit(parseFloat(range.value, 10) || 50);
  }

  function initHeaderScroll() {
    var nav = document.querySelector(".maid-nav");
    if (!nav) return;
    function update() {
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initCloseNavOnHash() {
    var el = document.getElementById("maidNav");
    if (!el || typeof bootstrap === "undefined") return;
    el.querySelectorAll('a.nav-link[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function () {
        if (!window.matchMedia("(max-width: 991.98px)").matches) return;
        var c = bootstrap.Collapse.getOrCreateInstance(el);
        if (el.classList.contains("show")) c.hide();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initBeforeAfter();
    initHeaderScroll();
    initCloseNavOnHash();
  });
})();
