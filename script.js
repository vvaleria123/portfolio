document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     SCROLL ANIMATION
  =============================== */

  const sections = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    observer.observe(section);

    const children = section.querySelectorAll("p, h2, h3, img, span");
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.15}s`;
    });
  });


  /* ===============================
     HOBBIES TABS
  =============================== */

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  function activateHobbyTab(target) {
    if (!target) return;

    // activate button
    tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === target);
    });

    // show correct content
    tabContents.forEach(content => {
      content.classList.toggle("active", content.id === target);
    });

    // scroll after browser has applied visibility changes
    const contentEl = document.getElementById(target);
    if (contentEl) {
      requestAnimationFrame(() => {
        contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      const hobbiesSection = document.getElementById("hobbies");
      if (hobbiesSection) {
        requestAnimationFrame(() => {
          hobbiesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }

  // tab button clicks
  tabButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const target = this.dataset.tab;
      activateHobbyTab(target);
    });
  });


  /* ===============================
     NAVIGATION LINKS FIX
  =============================== */

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    const target = href.substring(1);

    if (["drawings", "photography", "other"].includes(target)) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        activateHobbyTab(target);
        history.replaceState(null, "", `#${target}`);
      });
    }
    // single Hobbies menu item
    if (target === "hobbies") {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        // determine currently active tab, or default to drawings
        const activeBtn = document.querySelector('.tab-btn.active');
        const hobbyTarget = activeBtn ? activeBtn.dataset.tab : 'drawings';
        activateHobbyTab(hobbyTarget);
        history.replaceState(null, "", '#hobbies');
      });
    }
  });


  /* ===============================
     HASH ON PAGE LOAD
  =============================== */

  const hash = window.location.hash.replace("#", "");
  if (["drawings", "photography", "other"].includes(hash)) {
    activateHobbyTab(hash);
  } else if (hash === "hobbies") {
    // open hobbies section with default tab (drawings)
    activateHobbyTab('drawings');
  }


  /* ===============================
     LIGHTBOX
  =============================== */

  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  if (lightbox && lightboxImg) {

    images.forEach(img => {
      img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
      });
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

});