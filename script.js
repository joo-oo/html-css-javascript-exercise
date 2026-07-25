/* ======================================================
   1. Card hover -> changes the portfolio section's background
====================================================== */
const portfolioSection = document.getElementById('portfolio');

document.querySelectorAll('.project-card').forEach(function (card) {
  // Trigger background change on mouse enter
  card.addEventListener('mouseenter', function () {
    const color = card.getAttribute('data-color');
    if (color) portfolioSection.style.backgroundColor = color;
  });

  // Revert back to original color when mouse leaves
  card.addEventListener('mouseleave', function () {
    portfolioSection.style.backgroundColor = ''; // Reverts to CSS default
  });
});

/* ======================================================
   2. "View details" -> modal travels from the button's
      position to the center of the screen
====================================================== */
const modals = document.querySelectorAll('.modal');

// Hooking into Bootstrap's native event ensures it calculates right when opening
modals.forEach(function (modal) {
  modal.addEventListener('show.bs.modal', function (event) {
    const btn = event.relatedTarget; 
    const dialog = modal.querySelector('.modal-dialog');
    if (!dialog || !btn) return;

    // Get exact button coordinates relative to the viewport
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    // Distance from the button to the center of the screen
    const dx = btnCenterX - viewportCenterX;
    const dy = btnCenterY - viewportCenterY;

    // Apply exact pixel values to CSS variables for the animation
    dialog.style.setProperty('--dx', dx + 'px');
    dialog.style.setProperty('--dy', dy + 'px');
  });
});

/* ======================================================
   3. Contact form validation
====================================================== */
const contactForm = document.getElementById('contactForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const subjectField = document.getElementById('subject');
const messageField = document.getElementById('message');
const messageCount = document.getElementById('messageCount');

// live character counter for the message field
messageField.addEventListener('input', function () {
  const len = messageField.value.length;
  messageCount.textContent = len + ' / 500';
  messageCount.classList.toggle('text-danger', len > 500);
});

// re-validate a single field as the user types/leaves it,
// so errors clear the moment they're fixed (better UX than only checking on submit)
[nameField, emailField, subjectField, messageField].forEach(function (field) {
  field.addEventListener('input', function () {
    if (contactForm.classList.contains('was-validated')) {
      field.checkValidity();
    }
  });
});

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (!contactForm.checkValidity()) {
    contactForm.classList.add('was-validated');
    const firstInvalid = contactForm.querySelector(':invalid');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const name = nameField.value.trim();
  alert('Thanks' + (name ? ', ' + name : '') + '! Your message has been sent. I\'ll get back to you soon.');

  contactForm.reset();
  contactForm.classList.remove('was-validated');
  messageCount.textContent = '0 / 500';
  messageCount.classList.remove('text-danger');
});
