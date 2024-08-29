/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

interface SendVerificationEmailData {
  email: string;
  code: string;
}

export const sendVerificationEmail = functions.https.onCall(
  async (data: SendVerificationEmailData, context: functions.https.CallableContext) => {
    const { email, code } = data;

    // Validate email and code
    if (!email || !code) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with two arguments: "email" and "code".'
      );
    }

    const msg = {
      to: email,
      from: 'your-email@example.com',
      subject: 'Your Verification Code',
      text: `Your verification code is ${code}`,
      html: `<strong>Your verification code is ${code}</strong>`,
    };

    try {
      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while sending the email.'
      );
    }
  }
);

