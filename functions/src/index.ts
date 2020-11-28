import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  // console.log('hello');
  response.send('Hello from Firebaass!');
});

export const addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;

  const writeResult = await admin
    .firestore()
    .collection('messages')
    .add({ original });
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

export const makeUppercase = functions.firestore
  .document(`/messages/{documentId}`)
  .onCreate((snap, context) => {
    const original = snap.data().original;
    functions.logger.log(`Uppercase`, context.params.documentId, original);
    const uppercase = original.toUpperCase();

    return snap.ref.set({ uppercase }, { merge: true });
  });
