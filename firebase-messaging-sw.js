importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyCiKR_Nhl6tfDYgR-Y-XTR7WzJh8sHJpdA",
  authDomain:"ar4-consultor.firebaseapp.com",
  projectId:"ar4-consultor",
  storageBucket:"ar4-consultor.firebasestorage.app",
  messagingSenderId:"804873108130",
  appId:"1:804873108130:web:a0a63bfae687b43b1975fb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '🛡️ AR4 Recuperou!';
  const body = payload.notification?.body || 'Seu veículo está protegido!';
  self.registration.showNotification(title, {
    body,
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200],
    tag: 'ar4-alerta',
    renotify: true,
    data: payload.data
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
