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
// Tab functionality for Hobbies & Artwork
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    tabContents.forEach(content => {
      content.classList.remove("active");
      if(content.id === target) content.classList.add("active");
    });
  });
});