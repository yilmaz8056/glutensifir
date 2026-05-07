// TODO: LÜTFEN KENDİ FIREBASE PROJE BİLGİLERİNİ BURAYA GİR
const firebaseConfig = {
  apiKey: "SENIN_API_ANAHTARIN_BURAYA",
  authDomain: "proje-adi.firebaseapp.com",
  projectId: "proje-adi",
  storageBucket: "proje-adi.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Firebase'i Başlat
let firebaseAppInstance;
let db;
let auth;

try {
  // Using Compat library, firebase is on window
  firebaseAppInstance = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  auth = firebase.auth();
  console.log("🔥 Firebase başarıyla başlatıldı!");
} catch (error) {
  console.error("Firebase başlatma hatası (Konfigürasyonu kontrol et): ", error);
}

// Global scope'a ekliyoruz (Compat versiyonu için)
window.firebaseDb = db;
window.firebaseAuth = auth;
window.firebaseApp = firebaseAppInstance;
