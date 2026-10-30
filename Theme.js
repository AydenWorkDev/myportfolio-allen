// ===== Theme Dark Mode ===== //
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeBtn");
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(theme, save) {
    root.setAttribute("data-theme", theme);
    if (btn) btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    if (save) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
  }

  // Button: switch and remember the choice
  if (btn) {
    btn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next, true);
    });
  }

  // If the visitor never chose, follow the system when it changes
  media.addEventListener("change", function (e) {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) setTheme(e.matches ? "dark" : "light", false);
  });
})();