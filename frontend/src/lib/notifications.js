import {
    getToken,
    onMessage
} from 'firebase/messaging';

import {
    messaging,
    hasConfig
} from './firebase';

import api from './api';

export async function setupNotifications() {
    if (!hasConfig || !messaging) {
        console.log('Firebase Messaging is not configured.');
        return null;
    }

    if (
        !('Notification' in window) ||
        !('serviceWorker' in navigator)
    ) {
        console.log(
            'This browser does not support web notifications.'
        );
        return null;
    }

    try {
        const permission = await Notification.requestPermission();

        if (permission !== 'granted') {
            console.log('Notification permission was not granted.');
            return null;
        }

        const registration =
            await navigator.serviceWorker.register(
                '/firebase-messaging-sw.js'
            );

        const token = await getToken(messaging, {
            vapidKey:
                import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration
        });

        if (!token) {
            console.log('No FCM token was generated.');
            return null;
        }

        await api.post('/auth/fcm-token', {
            token
        });

        console.log('FCM token saved successfully.');

        onMessage(messaging, (payload) => {
            const title =
                payload.notification?.title ||
                'PetMatch';

            const body =
                payload.notification?.body ||
                'You have a new update.';

            if (Notification.permission === 'granted') {
                new Notification(title, {
                    body,
                    icon: '/petmatch-mark.svg'
                });
            }
        });

        return token;
    } catch (error) {
        console.error(
            'Firebase notification setup failed:',
            error
        );

        return null;
    }
}