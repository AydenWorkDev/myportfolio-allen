/* ----- MOBILE MENU ----- */
var menuToggle = document.getElementById("menuToggle");
var navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
}

menuToggle.addEventListener("click", function () {
  setMenu(!navLinks.classList.contains("open"));
});

// Close the menu after tapping a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () { setMenu(false); });
});

/* ----- HIGHLIGHT THE LINK OF THE SECTION YOU ARE ON ----- */
var sections = document.querySelectorAll("section[id]");
var links = document.querySelectorAll("#navLinks a");

function scrollActive() {
  var scrollY = window.scrollY + 120;
  var current = "home";

  sections.forEach(function (section) {
    if (scrollY >= section.offsetTop) current = section.id;
  });

  links.forEach(function (link) {
    if (link.getAttribute("href") === "#" + current) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}
window.addEventListener("scroll", scrollActive);
scrollActive();

/* ----- TYPING EFFECT ----- */
new Typed(".typedText", {
  strings: ["BSIT Student","3rd year"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

/* ----- DOWNLOAD RESUME ----- */
function downloadResume() {
  var link = document.createElement("a");
  link.href = "resume/resume.pdf";
  link.download = "Cris Allen_Resume.pdf";
  link.click();
}


// ----- EVERY YEAR CHANGE THE YEAR ON COPYRIGHT ----- 
document.getElementById("year").textContent = new Date().getFullYear();


// ===== Loading screen =====
(function () {
  var loader = document.getElementById("loader");
  if (!loader) return;

  // Remember when the visitor leaves for another page of my site
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || a.target === "_blank") return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto:|tel:)/i.test(href)) return;
    try {
      var url = new URL(a.href, location.href);
      if (url.origin === location.origin && url.pathname !== location.pathname) {
        sessionStorage.setItem("skipLoaderAt", String(Date.now()));
      }
    } catch (err) {}
  });

  // Coming back from my own pages: skip
  if (document.documentElement.classList.contains("no-loader")) {
    loader.remove();
    return;
  }

  var MIN_TIME = 3000;
  document.body.classList.add("is-loading");

  function run() {
    var start = Date.now();
    function closeLoader() {
      var wait = Math.max(0, MIN_TIME - (Date.now() - start));
      setTimeout(function () {
        loader.classList.add("hide");
        document.body.classList.remove("is-loading");
        setTimeout(function () { loader.remove(); }, 600);
      }, wait);
    }
    if (document.readyState === "complete") closeLoader();
    else window.addEventListener("load", closeLoader);
  }

  // If the app pre-loaded the page in the background, start when it is really shown
  if (document.prerendering) {
    document.addEventListener("prerenderingchange", run, { once: true });
  } else if (document.visibilityState === "hidden") {
    document.addEventListener("visibilitychange", function onVis() {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVis);
        run();
      }
    });
  } else {
    run();
  }
})();
