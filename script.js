// Hamburger Menu Toggle
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('active');
}

// Typewriter Effect
const name = "Suryansh Patel";
const el = document.getElementById("h1");
let index = 0;
function type() {
  if (index < name.length) {
    el.textContent += name[index];
    index++;
    setTimeout(type, 90);
  }
}
window.onload = type;

// Contact Form Submission
// Yeh line me apna Web App ka URL paste kar
const scriptURL = "https://script.google.com/macros/s/AKfycbwEL-4BOX6qmlVoYRBT_Ai8p1UpTgW4E45olbrmuWg16gWD1-O-cj-bhg6VT9Zm7tGexQ/exec"; // put your /exec URL

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status") || (function(){
  const p = document.createElement('p'); p.id='form-status'; p.style.marginTop='10px'; p.style.color='lightgreen';
  form.parentNode.appendChild(p);
  return p;
})();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  statusEl.style.color = 'lightgreen';
  statusEl.textContent = 'Sending...';

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form) // FORM DATA - easiest & most compatible
  })
  .then(response => {
    // try parse JSON if possible
    return response.text().then(text => {
      try { return JSON.parse(text); } catch(_) { return text; }
    });
  })
  .then(result => {
    // result may be object {status:'success'} or plain text
    statusEl.textContent = '✅ Message sent successfully!';
    form.reset();
    setTimeout(() => statusEl.textContent = '', 4000);
  })
  .catch(err => {
    console.error('Send error:', err);
    statusEl.style.color = 'salmon';
    statusEl.textContent = '❌ Failed to send. Check console & deployment settings.';
  });
});

