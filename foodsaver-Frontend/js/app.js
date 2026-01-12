document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PAGE NAVIGATION ---------- */
  const navLinks = document.querySelectorAll(".sidebar nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const page = link.getAttribute("data-page");
      if (page) {
        window.location.href = page;
      }
    });
  });

  /* ---------- ACTIVE LINK HIGHLIGHT ---------- */
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---------- DARK MODE ---------- */
  const toggleBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  /* ---------- LOGOUT ---------- */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/index.html"; // ✅ Netlify-safe
    });
  }

});
