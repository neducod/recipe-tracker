/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const welcomeText = document.getElementById("welcome-text");
const recipeForm = document.getElementById("recipe-form");
const recipeList = document.getElementById("recipe-list");
const signoutBtn = document.getElementById("signout-btn");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    console.log("Logged in as:", user.uid);

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.exists() ? userDoc.data().username : "User";
    welcomeText.textContent = `Welcome, ${username}!`;

    loadRecipes(user.uid);
  } else {
    window.location.href = "./index.html"; //
  }
});

recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const instructions = document.getElementById("instructions").value;

  try {
    await addDoc(collection(db, "recipes"), {
      userId: currentUser.uid,
      title,
      instructions,
      createdAt: new Date()
    });
    console.log("Recipe saved!");

    recipeForm.reset();
    loadRecipes(currentUser.uid);
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
});

async function loadRecipes(userId) {
  recipeList.innerHTML = "";
  console.log("Loading recipes for:", userId);

  const q = query(collection(db, "recipes"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No recipes found.");
    recipeList.innerHTML = "<li>No recipes yet.</li>";
  }

  querySnapshot.forEach((doc) => {
    const recipe = doc.data();
    console.log("Fetched recipe:", recipe);

    const li = document.createElement("li");
    li.innerHTML = `<strong>${recipe.title}</strong><br>${recipe.instructions}`;
    recipeList.appendChild(li);
  });
}

signoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./index.html";
});
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { updateDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { deleteDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// 🔐 Your Firebase config
const firebaseConfig = {
  // apiKey: "AIzaSyC61gF08n-oA6ZjR8UmY0gPW7E9iL5CKjQ",
  apiKey: "AIza" + "SyC61gF08n-oA6ZjR8UmY0gPW7E9iL5CKjQ",

  authDomain: "recipe-tracker-79fec.firebaseapp.com",
  projectId: "recipe-tracker-79fec",
  storageBucket: "recipe-tracker-79fec.firebasestorage.app",
  messagingSenderId: "538884277391",
  appId: "1:538884277391:web:2e5721d9c60afb2ca99cfa",
  measurementId: "G-61ENBR7C1Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const welcomeText = document.getElementById("welcome-text");
const recipeForm = document.getElementById("recipe-form");
const recipeList = document.getElementById("recipe-list");
const signoutBtn = document.getElementById("signout-btn");

//testing a code
const profileForm = document.getElementById("profile-form");
const usernameInput = document.getElementById("username");
const newEmailInput = document.getElementById("new-email");
const emailDisplay = document.getElementById("email"); // for showing current email

//i'm testing a code

let currentUser = null;

// ✅ 1. Check login session
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    console.log("✅ Logged in as:", user.email);

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const username = userDoc.exists() ? userDoc.data().username : "User";
      welcomeText.textContent = `Welcome, ${username}!`;

      loadRecipes(user.uid);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  } else {
    // ❌ Not logged in → Redirect after short delay
    console.warn("User not logged in. Redirecting...");
    welcomeText.textContent = "Not logged in. Redirecting to login...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }

  //testing a code
  // Show email in profile tab
  emailDisplay.value = user.email;

  // Load username from Firestore
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    usernameInput.value = data.username || "";
  }

  //tesing a code
});

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const newUsername = usernameField.value.trim();
  const newEmail = newEmailField.value.trim();
});

//testing a code
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newUsername = usernameInput.value.trim();
  const newEmail = newEmailInput.value.trim();
  const user = auth.currentUser;

  try {
    if (newUsername) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { username: newUsername }, { merge: true });
    }

    if (newEmail && newEmail !== user.email) {
      await updateEmail(user, newEmail);
      showToast("✅ Email updated. Please check your inbox.", "success");
    }

    showToast("✅ Profile updated", "success");
  } catch (error) {
    console.error(error);
    showToast("❌ " + error.message, "error");
  }
});

//tesing a code

// My code to  Save new recipe; recipe form feature
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const instructions = document.getElementById("instructions").value;

  try {
    await addDoc(collection(db, "recipes"), {
      userId: currentUser.uid,
      title,
      instructions,
      createdAt: new Date(),
    });

    console.log("✅ Recipe saved!");
    recipeForm.reset();
    loadRecipes(currentUser.uid);
  } catch (error) {
    console.error("❌ Error saving recipe:", error);
  }
});

// ✅ 3. Load all user’s recipes
/*
async function loadRecipes(userId) {
  recipeList.innerHTML = "";
  console.log("📦 Loading recipes for:", userId);

  const q = query(collection(db, "recipes"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    recipeList.innerHTML = "<li>No recipes yet. Add one above!</li>";
    return;
  }

  /*
  querySnapshot.forEach((doc) => {
    const recipe = doc.data();
    console.log("📄 Fetched recipe:", recipe);

    const li = document.createElement("li");
    li.innerHTML = `<strong>${recipe.title}</strong><br>${recipe.instructions}<br><br>`;
    recipeList.appendChild(li);
  });
  */

/*
  querySnapshot.forEach((docSnap) => {
    const recipe = docSnap.data();
    const docId = docSnap.id;
  
    const li = document.createElement("li");
    li.className = "p-4 border rounded-md mb-4 bg-white shadow";
  
    li.innerHTML = `
      <strong class="block text-lg">${recipe.title}</strong>
      <p class="text-sm text-gray-700">${recipe.instructions}</p>
      <button class="edit-btn bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600">Edit</button>
    `;
  
    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Edit title:", recipe.title);
      const newInstructions = prompt("Edit instructions:", recipe.instructions);
  
      if (newTitle && newInstructions) {
        const recipeRef = doc(db, "recipes", docId);
        updateDoc(recipeRef, {
          title: newTitle,
          instructions: newInstructions
        })
          .then(() => {
            console.log("✅ Recipe updated");
            loadRecipes(currentUser.uid); // refresh
          })
          .catch((err) => console.error("❌ Update failed:", err));
      }
    });
  
    recipeList.appendChild(li);
  });
  

}
*/

async function loadRecipes(userId) {
  recipeList.innerHTML = "";
  console.log("📦 Loading recipes for:", userId);

  const q = query(collection(db, "recipes"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    recipeList.innerHTML = "<li>No recipes yet. Add one above!</li>";
    return;
  }

  querySnapshot.forEach((docSnap) => {
    const recipe = docSnap.data();
    const docId = docSnap.id;

    const li = document.createElement("li");
    li.className = "p-4 border rounded-md mb-4 bg-white shadow";

    // Static display
    const titleEl = document.createElement("h3");
    titleEl.className = "text-lg font-semibold";
    titleEl.textContent = recipe.title;

    const instructionsEl = document.createElement("p");
    instructionsEl.className = "text-sm text-gray-600 mt-2";
    instructionsEl.textContent = recipe.instructions;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className =
      "bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600";

    li.appendChild(titleEl);
    li.appendChild(instructionsEl);
    li.appendChild(editBtn);

    // Edit handler
    editBtn.addEventListener("click", () => {
      // Replace with input fields
      const recipeItem = document.createElement("li");
      recipeItem.className =
        "p-4 bg-white rounded-xl shadow border border-gray-200";

      recipeItem.innerHTML = `
      ${
        recipe.imageUrl
          ? `<img src="${recipe.imageUrl}" alt="Recipe Image" class="w-full h-40 object-cover rounded-md mb-3">`
          : ""
      }
      <h4 class="text-lg font-semibold text-pink-600">${recipe.title}</h4>
      <p class="text-sm text-gray-600 mt-1">Ingredients: ${
        recipe.ingredients
      }</p>
      <div class="flex justify-end mt-4 gap-4">
        <button class="text-sm text-blue-600 hover:underline">Edit</button>
        <button class="text-sm text-red-600 hover:underline">Delete</button>
      </div>
    `;

      const titleInput = document.createElement("input");
      titleInput.value = recipe.title;
      titleInput.className = "w-full border px-2 py-1 rounded mb-2";

      const instructionsInput = document.createElement("textarea");
      instructionsInput.value = recipe.instructions;
      instructionsInput.className = "w-full border px-2 py-1 rounded mb-2";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className =
        "bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600";

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className =
        "bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className =
        "bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600";

      // Clear old display
      li.innerHTML = "";
      li.appendChild(titleInput);
      li.appendChild(instructionsInput);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);

      li.appendChild(deleteBtn);

      // Save
      saveBtn.addEventListener("click", async () => {
        const newTitle = titleInput.value.trim();
        const newInstructions = instructionsInput.value.trim();

        if (!newTitle || !newInstructions) {
          // alert("Both fields are required.");
          showToast("✅ Recipe saved!", "success");
          return;
        }

        const recipeRef = doc(db, "recipes", docId);
        await updateDoc(recipeRef, {
          title: newTitle,
          instructions: newInstructions,
        });

        // console.log("✅ Recipe updated");
        showToast("✅ Recipe updated!", "success");
        loadRecipes(currentUser.uid); // reload
      });

      // Cancel
      cancelBtn.addEventListener("click", () => {
        loadRecipes(currentUser.uid); // reset
      });

      deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm(
          "Are you sure you want to delete this recipe?"
        );
        if (!confirmDelete) return;

        try {
          const recipeRef = doc(db, "recipes", docId);
          await deleteDoc(recipeRef);
          // console.log("🗑 Recipe deleted");
          showToast("🗑️ Recipe deleted", "success");
          loadRecipes(currentUser.uid); // refresh list
        } catch (error) {
          console.error(error);
          showToast("❌ Failed to save recipe", "error");
          // console.error("❌ Failed to delete recipe:", error);
        }
      });
    });

    recipeList.appendChild(li);
  });
}

// ✅ 4. Sign out
signoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  console.log("👋 Signed out");
  window.location.href = "index.html";
});

//toast
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded shadow text-white text-sm ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;

  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

//profile hidden code to display
const tabButtons = document.querySelectorAll(".tab-btn");
const recipesPanel = document.getElementById("recipes-panel");
const profilePanel = document.getElementById("profile-panel");

document.getElementById("tab-recipes").addEventListener("click", () => {
  recipesPanel.classList.remove("hidden");
  profilePanel.classList.add("hidden");
  setActiveTab("tab-recipes");
});

document.getElementById("tab-profile").addEventListener("click", () => {
  profilePanel.classList.remove("hidden");
  recipesPanel.classList.add("hidden");
  setActiveTab("tab-profile");
});

function setActiveTab(activeId) {
  tabButtons.forEach((btn) => {
    btn.classList.remove("text-blue-600", "border-blue-600", "font-semibold");
    btn.classList.add("text-gray-500");
    if (btn.id === activeId) {
      btn.classList.add("text-blue-600", "border-blue-600", "font-semibold");
      btn.classList.remove("text-gray-500");
    }
  });
}
