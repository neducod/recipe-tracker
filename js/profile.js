import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, updateEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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
const db = getFirestore(app);

const emailField = document.getElementById("email");
const usernameField = document.getElementById("username");
const newEmailField = document.getElementById("new-email");
const profileForm = document.getElementById("profile-form");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  emailField.value = user.email;

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    usernameField.value = data.username || "";
  }
});

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const newUsername = usernameField.value.trim();
  const newEmail = newEmailField.value.trim();

  try {
    // Update username in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { username: newUsername }, { merge: true });

    // Update email in Firebase Auth
    if (newEmail && newEmail !== user.email) {
      await updateEmail(user, newEmail);
      showToast("✅ Email updated. Please verify it.", "success");
    }

    showToast("✅ Profile updated", "success");
  } catch (error) {
    console.error(error);
    showToast("❌ " + error.message, "error");
  }
});

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded shadow text-white text-sm ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 5000);
}
