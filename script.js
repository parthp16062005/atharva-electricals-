// ===== Project data =====
// Add a new project by copying one object below and filling it in.
// image: put the file in /images/projects/ and reference it here.
const projects = [
  {
    title: "Solar Plant Grid Connection – Ashti",
    category: "Solar / Industrial",
    image: "images/projects/solar-1.jpg",
    problem: "A newly built solar plant needed to be connected to the state electricity grid (MSEB) to become operational.",
    work: "Carried out the electrical wiring connection from the MSEB supply line to the solar plant, ensuring a safe and compliant grid tie-in."
  },
  {
    title: "Solar Plant Grid Connection – Bhose",
    category: "Solar / Industrial",
    image: "images/projects/solar-2.jpg",
    problem: "Solar installation required grid connectivity for power evacuation from the site.",
    work: "Connected electric wiring from the MSEB line to the plant, coordinating with the site's electrical infrastructure during setup."
  }
];

// ===== Render portfolio grid =====
const grid = document.getElementById('portfolio-grid');

function renderProjects() {
  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card" data-index="${i}">
      <img src="${p.image}" alt="${p.title}">
      <div class="project-card-info">
        <span class="project-category">${p.category}</span>
        <h3>${p.title}</h3>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(projects[card.dataset.index]));
  });
}

// ===== Modal logic =====
const overlay = document.getElementById('modal-overlay');

function openModal(project) {
  document.getElementById('modal-image').src = project.image;
  document.getElementById('modal-category').textContent = project.category;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-problem').textContent = project.problem;
  document.getElementById('modal-work').textContent = project.work;
  overlay.classList.add('active');
}

document.getElementById('modal-close').addEventListener('click', () => {
  overlay.classList.remove('active');
});
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

renderProjects();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated stats counter =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsBarEl = document.querySelector('.stats-bar');
if (statsBarEl) statsObserver.observe(statsBarEl);
// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});