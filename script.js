const sections = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);

  // optional: stagger child animations
  const children = section.querySelectorAll('p, h2, h3, img, span'); 
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * 0.15}s`;
  });
});
// Tab functionality for Hobbies & Artwork (adds hash-on-load behavior)
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

function activateHobbyTab(target, scroll = true) {
  if (!target) return;
  console.log('activateHobbyTab called for:', target, 'scroll:', scroll);
  // activate button
  const btn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
  if (btn) {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // show content
  tabContents.forEach(content => {
    content.classList.remove('active');
    if (content.id === target) content.classList.add('active');
  });

  // optionally scroll to the hobbies section
  if (scroll) {
    const hobbiesSection = document.getElementById('hobbies');
    if (hobbiesSection) hobbiesSection.scrollIntoView({ behavior: 'smooth' });
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    activateHobbyTab(target, false);
  });
});

// ensure navigation links for drawings/photography/other open the correct tab
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    const target = href.slice(1);
    if (['drawings','photography','other'].includes(target)) {
      link.addEventListener('click', e => {
        e.preventDefault();
        // activate tab (don't auto-scroll to hobbies wrapper yet)
        activateHobbyTab(target, false);
        // update the URL hash without jumping
        try { history.replaceState(null, '', `#${target}`); } catch (err) {}
        // give the browser a bit more time to render the now-visible content, then scroll to it
        setTimeout(() => {
          console.log('nav link click scroll to:', target);
          const contentEl = document.getElementById(target);
          if (contentEl) contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      });
    }
  }
});

// on DOMContentLoaded, check URL hash and activate matching hobby tab if present
document.addEventListener('DOMContentLoaded', () => {
  const hash = (location.hash || '').replace('#', '');
  if (['drawings','photography','other'].includes(hash)) {
    // activate tab and scroll
    activateHobbyTab(hash, true);
  }
});

// respond to later hash changes (e.g., user pastes #photography or uses browser history)
window.addEventListener('hashchange', () => {
  const h = (location.hash || '').replace('#', '');
  if (['drawings','photography','other'].includes(h)) {
    activateHobbyTab(h, false);
    // scroll to the visible tab content
    setTimeout(() => {
      const el = document.getElementById(h);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  }
});

// LIGHTBOX (fixed version)
document.addEventListener("DOMContentLoaded", function () {

  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  images.forEach(img => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;
    });
  });

  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });

});