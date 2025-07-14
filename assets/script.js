const overlay = document.getElementById('bookingOverlay');
const btn = document.getElementById('openOverlay');
const span = document.getElementsByClassName('close')[0];

if (btn && overlay && span) {
  btn.onclick = () => overlay.style.display = 'block';
  span.onclick = () => overlay.style.display = 'none';
  window.onclick = (e) => {
    if (e.target == overlay) overlay.style.display = 'none';
  };
}
// Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });

  // ✅ Close the menu when any link is clicked
  const links = navLinks.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
    });
  });


  document.querySelectorAll('input[name="type"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const companyFields = document.querySelector('.company-fields');
      if (document.querySelector('input[name="type"]:checked').value === 'unternehmen') {
        companyFields.style.display = 'flex';
      } else {
        companyFields.style.display = 'none';
      }
    });
  });

  // Next button logic
  document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
  });

  document.querySelectorAll('a[href="#styled-form"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const form = document.querySelector('#styled-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          form.querySelector('input, select, textarea').focus();
        }, 600);
      }
    });
  });

  $(document).ready(function () {
    $('#source-language').select2({
      placeholder: "Wählen Sie Sprachen",
      tags: true,
      width: '100%'
    });
    $('#target-language').select2({
      placeholder: "Wählen Sie Sprachen",
      tags: true,
      width: '100%'
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const langs = document.querySelectorAll('.lang-link');

    // 1) On page load: set the active link based on the URL
    if (window.location.pathname.includes('index-en')) {
      document.querySelector('.lang-switch-desktop .lang-link[href*="index-en.html"]').classList.add('active');
      document.querySelector('.lang-switch .lang-link[href*="index-en.html"]').classList.add('active');
    } else {
      document.querySelector('.lang-switch-desktop .lang-link[href*="index.html"]').classList.add('active');
      document.querySelector('.lang-switch .lang-link[href*="index.html"]').classList.add('active');
    }

    // 2) When a user clicks, toggle active class
    langs.forEach(link => {
      link.addEventListener('click', () => {
        // remove from all
        langs.forEach(l => l.classList.remove('active'));
        // add to the clicked one
        link.classList.add('active');
        // let the browser navigate normally to the new page
      });
    });
  });