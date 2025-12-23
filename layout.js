document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  loadFooter();
});

function initHeader() {
  // Initialize sticky header logic
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Re-initialize Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const menuIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('active');
      if (mainNav.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        // Close dropdown when mobile menu closes
        document.querySelector('.dropdown-content')?.classList.remove('active');
        document.querySelector('.dropdown-btn')?.classList.remove('active');
      }
    });
  }

  // Mobile Dropdown Logic for megamenu
  const hasMegamenu = document.querySelectorAll('.has-megamenu');
  hasMegamenu.forEach(item => {
    const menuLink = item.querySelector('a'); // Get the main link

    if (menuLink) {
      menuLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 1020) {
          // Prevent navigation on mobile when clicking the parent link
          e.preventDefault();
          e.stopPropagation();

          // Close other open megamenus
          hasMegamenu.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });

          // Close dropdown
          document.querySelector('.dropdown-content')?.classList.remove('active');
          document.querySelector('.dropdown-btn')?.classList.remove('active');

          // Toggle the active class to show/hide megamenu
          item.classList.toggle('active');
        }
      });
    }
  });

  // Login/Registration Dropdown Logic
  const dropdownBtn = document.querySelector('.dropdown-btn');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close megamenus if open
      hasMegamenu.forEach(item => {
        item.classList.remove('active');
      });

      // Toggle dropdown
      dropdownContent.classList.toggle('active');
      dropdownBtn.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
        dropdownContent.classList.remove('active');
        dropdownBtn.classList.remove('active');
      }
    });

    // Close dropdown when clicking on a dropdown item
    dropdownContent.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.classList.remove('active');
        dropdownBtn.classList.remove('active');
      });
    });
  }

  // Close all dropdowns when clicking escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownContent?.classList.remove('active');
      dropdownBtn?.classList.remove('active');
      hasMegamenu.forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  // Highlight active link
  highlightActiveLink();

  // Close dropdowns on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) {
      dropdownContent?.classList.remove('active');
      dropdownBtn?.classList.remove('active');
      hasMegamenu.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
}

function loadFooter() {
  const footerHTML = `
  <footer class="footer" id="contact">
    <div class="container footer-content">
      <div class="footer-col">
        <h5>The Qatar Talks</h5>
        <p>Empowering voices, inspiring change.</p>
      </div>
      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Register</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <p>info@theqatartalks.com</p>
        <p>+974 1234 5678</p>
      </div>
      <div class="footer-col">
        <h5>Follow Us</h5>
        <div class="social-links">
          <span class="social-icon"><i class="fab fa-facebook-f"></i></span>
          <span class="social-icon"><i class="fab fa-instagram"></i></span>
          <span class="social-icon"><i class="fab fa-twitter"></i></span>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2025 The Qatar Talks. All rights reserved.</p>
    </div>
  </footer>
  `;
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }
}

function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
    // Specific case for index
    if (page === '' || page === 'index.html') {
      if (link.getAttribute('href') === 'index.html') link.classList.add('active');
    }
  });
}