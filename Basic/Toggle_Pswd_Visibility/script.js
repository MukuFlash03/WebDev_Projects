// https://www.javascripttutorial.net/javascript-dom/javascript-toggle-password-visibility/
// https://astronautweb.co/snippet/font-awesome/

// fa-eye fa-eye-slash
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', (e) => {
    // toggle the type attribute
    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', "text");
        togglePassword.classList.remove("hide-btn");
    }
    else {
        password.setAttribute('type', "password");
        togglePassword.classList.add("hide-btn");
    }
});

// const type = password.getAttribute('type') === 'password' ? 'text' : 'password';