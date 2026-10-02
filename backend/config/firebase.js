const admin = require('firebase-admin');

let firebaseReady = false;

function initFirebase() {
    if (
        firebaseReady ||
        !process.env.FIREBASE_PROJECT_ID ||
        !process.env.FIREBASE_CLIENT_EMAIL ||
        !process.env.FIREBASE_PRIVATE_KEY
    ) {
        return firebaseReady;
    }

    const privateKey =
        process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey
        })
    });

    firebaseReady = true;

    console.log('Firebase Admin initialized');

    return true;
}

function isFirebaseReady() {
    return firebaseReady;
}

module.exports = {
    admin,
    initFirebase,
    isFirebaseReady
};