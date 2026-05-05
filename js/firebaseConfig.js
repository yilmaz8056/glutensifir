import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("🔥 Firebase başarıyla başlatıldı!");
} catch (error) {
  console.error("Firebase başlatma hatası (Konfigürasyonu kontrol et): ", error);
}

export { app, db, auth };
