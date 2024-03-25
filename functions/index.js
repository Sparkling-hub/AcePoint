/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
exports.subscriptionValidator = functions
    .region("europe-west1") // put your region here
    .pubsub.schedule('0 0 1 1 *') // scheduling statement
    .timeZone('UTC') // don't forget the time zone
    .onRun(async (context) => {
    // your cloud function here
    try {
      // Get a reference to the collection
      const colRef = db.collection("subscription");
      // Retrieve all documents in the collection
      const querySnapshot = await colRef.get();
      const currentDate= new Date()
      // Extract data from each document
      const documents = [];
      querySnapshot.forEach((doc) => {
        const dateToCompare=  doc.data()
        logger.log(dateToCompare)
        logger.log(currentDate)
        logger.log(dateToCompare.endDate <= currentDate)
        if (dateToCompare.endDate <= currentDate) {
          doc.ref.update({ status: "EXPIRED" })
          documents.push(doc.ref.update({ status: "EXPIRED" }))
        }
         
      });
      console.log('someFunction was run');
      return documents;
  } catch (error) {
      console.log('Error fetching documents:', error.message);
      return error.message;
  }
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
