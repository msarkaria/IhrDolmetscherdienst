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
