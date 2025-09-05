// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Function to get system theme preference
  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const currentTheme = savedTheme || getSystemTheme();
  body.setAttribute("data-theme", currentTheme);

  // Theme toggle functionality
  themeToggle.addEventListener("click", function () {
    const currentTheme = body.getAttribute("data-theme");
    const savedTheme = localStorage.getItem("theme");

    let newTheme;

    // Cycle through: system -> light -> dark -> system
    if (!savedTheme) {
      // Currently using system, switch to light
      newTheme = "light";
      localStorage.setItem("theme", "light");
    } else if (savedTheme === "light") {
      // Currently light, switch to dark
      newTheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      // Currently dark, switch back to system
      newTheme = getSystemTheme();
      localStorage.removeItem("theme");
    }

    body.setAttribute("data-theme", newTheme);
    updateThemeIcon(newTheme);
  });

  // Update theme icon based on current theme
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("svg");
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      // System theme - show auto icon
      icon.innerHTML = `
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        <path d="M12 6v6l4 2" stroke-width="2"/>
      `;
    } else if (theme === "dark") {
      // Dark theme - show sun icon
      icon.innerHTML = `
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      `;
    } else {
      // Light theme - show moon icon
      icon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      `;
    }
  }

  // Initialize theme icon
  updateThemeIcon(currentTheme);

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      // Only apply system theme if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        const systemTheme = e.matches ? "dark" : "light";
        body.setAttribute("data-theme", systemTheme);
        updateThemeIcon(systemTheme);
      }
    });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll effect to header
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document
    .querySelectorAll(".about-section, .contributions-section")
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });
});
