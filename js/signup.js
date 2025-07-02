// js/signup.js
/*
import { app } from './firebaseconfig.js';
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const auth = getAuth(app);

const form = document.getElementById('signup-form');
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');
const errorDisplay = document.getElementById('signup-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = './dashboard.html'; // ✅ This works too
  } catch (error) {
    errorDisplay.textContent = error.message;
  }
});
*/