const API_LOGIN_URL = 'https://dummyjson.com/auth/login';

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('login-message');

const adminLink = document.getElementById('admin-link');
const logoutButton = document.getElementById('logout-button');
const loginLink = document.querySelector('nav .nav-link[href="login.html"]');


export function isAuthenticated() {
  return sessionStorage.getItem('accessToken') !== null;
}

function setAccessToken(token) {
  sessionStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}


export function logout() {
  sessionStorage.removeItem('accessToken');
  alert('Sesión cerrada correctamente.');
  window.location.href = 'index.html';
}


function updateNavigationVisibility() {
  if (adminLink && logoutButton && loginLink) {
    if (isAuthenticated()) {
      loginLink.style.display = 'none';
      adminLink.style.display = 'block';
      logoutButton.style.display = 'inline-block';
    } else {
      loginLink.style.display = 'block';
      adminLink.style.display = 'none';
      logoutButton.style.display = 'none';
    }
  }
}


if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    loginMessage.style.display = 'none';
    loginMessage.textContent = '';

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      }

      const data = await response.json();
      setAccessToken(data.token);

      alert('¡Inicio de sesión exitoso!');
      window.location.href = 'administracion.html';
    } catch (error) {
      console.error('Error de login:', error);
      loginMessage.textContent = error.message;
      loginMessage.style.display = 'block';
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}


document.addEventListener('DOMContentLoaded', () => {
  updateNavigationVisibility();
});

window.addEventListener('storage', (event) => {
  if (event.key === 'accessToken') {
    updateNavigationVisibility();
  }
});