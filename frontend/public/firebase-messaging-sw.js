importScripts(
    'https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js'
);

importScripts(
    'https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
    apiKey: 'AIzaSyCK23uu4kR9dJY7juyEviiCyYj--wP7r-U',
    authDomain: 'pet-adoption-7447a.firebaseapp.com',
    projectId: 'pet-adoption-7447a',
    storageBucket: 'pet-adoption-7447a.firebasestorage.app',
    messagingSenderId: '198641079833',
    appId: '1:198641079833:web:d2ef20877f5e11b46cbc88'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle =
        payload.notification?.title || 'PetMatch';

    const notificationOptions = {
        body:
            payload.notification?.body ||
            'You have a new PetMatch update.',
        icon: '/petmatch-mark.svg',
        data: payload.data || {}
    };

    self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});