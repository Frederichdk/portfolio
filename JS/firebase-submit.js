// firebase-submit.js
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = form.firstName.value.trim();
      const lastName = form.lastName.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      try {
        await addDoc(collection(db, "messages"), {
          firstName,
          lastName,
          email,
          message,
          createdAt: serverTimestamp(),
        });

        form.reset();
        alert("Message submitted successfully!");
      } catch (err) {
        console.error("Error submitting form: ", err);
        alert("Failed to submit. Please try again.");
      }
    });
  }
});
