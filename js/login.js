/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";*/
/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
*/






/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// 🔐 My Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC61gF08n-oA6ZjR8UmY0gPW7E9iL5CKjQ",
  authDomain: "recipe-tracker-79fec.firebaseapp.com",
  projectId: "recipe-tracker-79fec",
  storageBucket: "recipe-tracker-79fec.firebasestorage.app",
  messagingSenderId: "538884277391",
  appId: "1:538884277391:web:2e5721d9c60afb2ca99cfa",
  measurementId: "G-61ENBR7C1Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorBox = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful! Welcome back, " + userCredential.user.email);
      window.location.href = "dashboard.html"; // redirect to dashboard
    } catch (error) {
      console.error(error);
      errorBox.textContent = "Login failed: " + error.message;
    }
  });
});
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// 🔐 My  Firebase config
const firebaseConfig = {
  // apiKey: "AIzaSyC61gF08n-oA6ZjR8UmY0gPW7E9iL5CKjQ",
  apiKey: "AIza" + "SyC61gF08n-oA6ZjR8UmY0gPW7E9iL5CKjQ",
  authDomain: "recipe-tracker-79fec.firebaseapp.com",
  projectId: "recipe-tracker-79fec",
  storageBucket: "recipe-tracker-79fec.firebasestorage.app",
  messagingSenderId: "538884277391",
  appId: "1:538884277391:web:2e5721d9c60afb2ca99cfa",
  measurementId: "G-61ENBR7C1Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorBox = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // alert("Login successful! Welcome back, " + userCredential.user.email);
      showToast("Login successful!. Welcome back, " + userCredential.user.email);
      window.location.href = "./dashboard.html";
    } catch (error) {
      console.error("Login failed", error);
      errorBox.textContent = "Login failed: " + error.message;
    }
  });






//forgot password code
  const forgotLink = document.getElementById("forgot-password");

forgotLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Enter your email to reset your password:");

  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    showToast("✅ Reset email sent! Check your inbox.", "success");
  } catch (error) {
    console.error(error);
    showToast("❌ " + error.message, "error");
  }
});
});





///code for toast
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded shadow text-white text-sm ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;

  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 8000);
}
