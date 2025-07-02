 /* import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC61gF08n-oA6ZjR8UmY0gPW7E9iL5CKjQ",
    authDomain: "recipe-tracker-79fec.firebaseapp.com",
    projectId: "recipe-tracker-79fec",
    storageBucket: "recipe-tracker-79fec.firebasestorage.app",
    messagingSenderId: "538884277391",
    appId: "1:538884277391:web:2e5721d9c60afb2ca99cfa",
    measurementId: "G-61ENBR7C1Z"
  };
/*
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  };
*/
  /*
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);



  // Handle form submission from signup.html

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const errorBox = document.getElementById("error-message");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = form.email.value;
      const password = form.password.value;
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful! Welcome, " + userCredential.user.email);
        window.location.href = "dashboard.html";
      } catch (error) {
        console.error(error);
        errorBox.textContent = error.message;
      }
    });
  });



*/


// ✅ Use same version for all Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);

// ✅ Handle signup form

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const errorBox = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = form.username.value; // ✅ correct
    const email = form.email.value;
    const password = form.password.value;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        username: username,  // ✅ saved correctly
        email: email,
        createdAt: new Date()
      });
  
      alert("Signup successful! Welcome, " + username);
      window.location.href = "dashboard.html";
    } catch (error) {
      errorBox.textContent = error.message;
    }
  })
});

  





  /*
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save extra data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        createdAt: new Date()
      });

      alert("Signup successful! Welcome, " + username);
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error(error);
      errorBox.textContent = error.message;
    }
  });
});
*/



/*
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const errorBox = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;




    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! Welcome, " + userCredential.user.email);
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error(error);
      errorBox.textContent = error.message;
    }
  });
});
*/