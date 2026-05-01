document.addEventListener("DOMContentLoaded", () => {

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  // Keep a CSS var in sync with the real navbar height so fixed header offsets work
  function updateNavHeight() {
    if (!navbar) return;
    const h = navbar.offsetHeight || 85;
    document.documentElement.style.setProperty('--nav-height', h + 'px');
  }

  // init and keep updated on resize
  updateNavHeight();
  window.addEventListener('resize', updateNavHeight);

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // update height after menu toggle in case layout changed
    setTimeout(updateNavHeight, 80);
    // Change icon between bars and times
    const icon = hamburger.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      // restore nav height after closing
      setTimeout(updateNavHeight, 60);
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(226, 229, 237, 0.98)';
    } else {
      navbar.style.background = 'rgba(220, 224, 236, 0.95)';
    }
  });

  // Project Filter — only initialize when filter buttons exist
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-pro');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });

      // Keyboard activation for accessibility
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  console.log("%cBVC Reality Website Loaded Successfully!", "color: #f97316; font-size: 16px; font-weight: bold;");
});