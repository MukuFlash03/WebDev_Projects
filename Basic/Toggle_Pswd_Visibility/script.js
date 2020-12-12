// https://www.javascripttutorial.net/javascript-dom/javascript-toggle-password-visibility/

// fa-eye fa-eye-slash
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', (e) => {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the icon
    this.classList.toggle('fa-eye-slash');

});