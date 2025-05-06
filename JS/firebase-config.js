// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANY-esf6W7hhCRqluKWlfwV8soSXKGXZI",
  authDomain: "portfolio-190803.firebaseapp.com",
  projectId: "portfolio-190803",
  storageBucket: "portfolio-190803.appspot.com",
  messagingSenderId: "519280448825",
  appId: "1:519280448825:web:9064802fa7b19007f004e8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
