import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {defineSecret} from "firebase-functions/params";
import {initializeApp} from "firebase-admin/app";
import * as logger from "firebase-functions/logger";
import sgMail from "@sendgrid/mail";

// Initialize Firebase Admin SDK
initializeApp();

// Define secret for SendGrid
const SENDGRID_API_KEY = defineSecret("sendgrid_key");

// Register secret in function config
export const sendContactEmail = onDocumentCreated(
    {
      document: "messages/{messageId}",
      secrets: [SENDGRID_API_KEY],
    },
    async (event) => {
      const data = event.data?.data();

      if (!data) {
        logger.error("❌ No data found in Firestore document.");
        return;
      }

      // Use the secret
      sgMail.setApiKey(SENDGRID_API_KEY.value());

      const msg = {
        to: "dekokerfw@gmail.com",
        from: "dekokerfw@gmail.com",
        subject: `Portfolio message from ${data.firstName} ${data.lastName}`,
        html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      };

      try {
        await sgMail.send(msg);
        logger.info("✅ Email sent successfully.");
      } catch (err) {
        logger.error("❌ Failed to send email:", err);
      }
    },
);
