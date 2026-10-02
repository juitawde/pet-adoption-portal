import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

const hasConfig = Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID
);

let app = null;
let auth = null;
let messaging = null;

if (hasConfig) {
    app = initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    });

    auth = getAuth(app);

    if ('Notification' in window && 'serviceWorker' in navigator) {
        messaging = getMessaging(app);
    }
}

export {
    auth,
    messaging,
    hasConfig
};