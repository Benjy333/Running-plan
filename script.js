const byId = (id) => document.getElementById(id);
document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  byId('year').textContent = year;

  const button = byId('primaryAction');
  if (button) {
    button.addEventListener('click', () => alert('You clicked the thing! 🎉'));
  }

  const form = document.getElementById('contactForm');
  const msg = byId('msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      // Demo: pretend to send
      setTimeout(() => {
        msg.textContent = `Thanks, ${data.name || 'friend'} — message sent!`;
        form.reset();
      }, 500);
    });
  }
});
