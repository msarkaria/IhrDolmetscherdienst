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


// 1) Cache the wrapper + all its inputs
const companyFields = document.querySelector('.company-fields');
const companyInputs = companyFields.querySelectorAll('input, select');

// 2) Toggle function
function updateCompanyFields() {
  const isCompany = document.querySelector('input[name="type"]:checked').value === 'unternehmen';

  // show/hide
  companyFields.style.display = isCompany ? 'flex' : 'none';

  // enable or disable + required toggle
  companyInputs.forEach(el => {
    el.disabled  = !isCompany;
    el.required  =  isCompany;
  });
}

// 3) Wire up change listeners
document.querySelectorAll('input[name="type"]').forEach(radio => {
  radio.addEventListener('change', updateCompanyFields);
});

// 4) Init on load
updateCompanyFields();

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

// ——— Form submission to Google Apps Script ———
const form = document.getElementById('styled-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // collect all form fields
    const formData = new FormData(form);
    const data = {};

    // for multi-selects (select[multiple]), FormData.getAll returns an array
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        // accumulate repeated keys (e.g. multiple checkboxes or multi-select)
        Array.isArray(data[key])
          ? data[key].push(value)
          : data[key] = [data[key], value];
      } else {
        data[key] = value;
      }
    }

    // include origin for your domain‐check in doPost
    data.siteOrigin = window.location.origin;

    // send to your Apps Script
    try {
      const resp = await fetch(
        'https://script.google.com/macros/s/AKfycbzYSVp7Vff_-Rus66d91c4vQHi025dmEj4W5b3xQSpELu6An2HObmGQI0Bb51w2U8i6/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      const result = await resp.json();

      if (result.result === 'success') {
        // show a thank‐you message
        document.getElementById('form-result').innerHTML =
          '<p class="success">Vielen Dank! Ihre Anfrage wurde versendet.</p>';
        form.reset();
        updateCompanyFields();  
        // optionally jump back to step 1
        $('#source-language, #target-language').val(null).trigger('change');
        document.getElementById('step-2').style.display = 'none';
        document.getElementById('step-1').style.display = 'block';
      } else if (result.result === 'spam_detected') {
        document.getElementById('form-result').innerHTML =
          '<p class="error">Spam‐Verdacht erkannt. Ihre Anfrage wurde nicht gesendet.</p>';
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      document.getElementById('form-result').innerHTML =
        '<p class="error">Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.</p>';
    }
  });
}