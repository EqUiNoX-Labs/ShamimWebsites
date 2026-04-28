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

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initHeaderScroll();
    initCloseNavOnHash();
  });
})();
