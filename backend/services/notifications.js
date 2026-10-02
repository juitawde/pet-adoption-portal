const { admin, isFirebaseReady } = require('../config/firebase');

async function sendPush(user, title, body, data = {}) {
    console.log('\n========== FCM NOTIFICATION ==========');
    console.log('User:', user?.email || user?._id || 'Unknown');
    console.log('FCM Token exists:', Boolean(user?.fcmToken));
    console.log('Firebase ready:', isFirebaseReady());
    console.log('Title:', title);
    console.log('Body:', body);

    if (!isFirebaseReady()) {
        console.log('❌ Firebase Admin is NOT initialized.');
        console.log('======================================\n');

        return {
            sent: false,
            reason: 'Firebase Admin is not initialized'
        };
    }

    if (!user?.fcmToken) {
        console.log('❌ User does not have an FCM token.');
        console.log('======================================\n');

        return {
            sent: false,
            reason: 'No FCM token'
        };
    }

    try {
        const message = {
            token: user.fcmToken,
            notification: {
                title,
                body
            },
            data: Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                    key,
                    String(value)
                ])
            )
        };

        console.log('Sending notification to Firebase...');

        const response = await admin.messaging().send(message);

        console.log('✅ FCM notification sent successfully!');
        console.log('Firebase message ID:', response);
        console.log('======================================\n');

        return {
            sent: true,
            messageId: response
        };

    } catch (error) {
        console.error('\n❌ FCM NOTIFICATION FAILED');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        console.log('======================================\n');

        return {
            sent: false,
            reason: error.message,
            code: error.code
        };
    }
}

module.exports = { sendPush };