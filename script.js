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
  strings: ["Cris Allen","BSIT Student","3rd year"],
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

// ===== Dark mode toggle =====
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

/* ----- EVERY YEAR CHANGE THE YEAR ON COPYRIGHT ----- */
document.getElementById("year").textContent = new Date().getFullYear();
