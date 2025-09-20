
// Bootstrap custom form validation
(() => {
  'use strict';

  // Fetch all forms with .needs-validation
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();  // Stop submission if invalid
        event.stopPropagation();
      }

      form.classList.add('was-validated'); // Bootstrap applies styles
    }, false);
  });
})();

