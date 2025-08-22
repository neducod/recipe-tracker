// js/auth.js
import { app } from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth(app);
const form = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

let isLogin = true;

// Toggle between Login and Signup
document.getElementById("toggle-btn").addEventListener("click", () => {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin
    ? "Login"
    : "Sign Up";
  document.getElementById("toggle-text").innerText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  document.getElementById("toggle-btn").innerText = isLogin
    ? "Sign up"
    : "Login";
  errorMessage.innerText = "";
});

// Form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    window.location.href = "ldashboard.html"; // Redirect on success
  } catch (err) {
    errorMessage.innerText = err.message;
  }
});
