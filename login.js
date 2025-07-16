// login.js
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');

const DEMO_EMAIL = 'admin@securelytix.com';
const DEMO_PASSWORD = 'Secure123';

togglePassword.addEventListener('change', () => {
  passwordInput.type = togglePassword.checked ? 'text' : 'password';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  emailError.textContent = '';
  passwordError.textContent = '';
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@securelytix\\.com$/;
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Use a valid email like admin@securelytix.com';
    isValid = false;
  }

  const password = passwordInput.value;
  if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\\d/.test(password)) {
    passwordError.textContent = 'Password must be at least 8 characters with letters and numbers';
    isValid = false;
  }

  if (isValid) {
    if (emailInput.value === DEMO_EMAIL && passwordInput.value === DEMO_PASSWORD) {
      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      alert('Login successful! Redirecting...');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid login credentials!');
    }
  }
});

window.onload = () => {
  const remembered = localStorage.getItem('rememberedEmail');
  if (remembered) {
    emailInput.value = remembered;
    document.getElementById('rememberMe').checked = true;
  }
};