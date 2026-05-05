import { db } from './firebaseConfig.js';
import { collection, getDocs, addDoc, doc, setDoc, updateDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firestore Database Service
const dbService = {
  // === PLACES ===
  async getPlaces() {
    try {
      if(!db) return [];
      const querySnapshot = await getDocs(collection(db, "places"));
      const places = [];
      querySnapshot.forEach((doc) => {
        places.push({ id: doc.id, ...doc.data() });
      });
      return places;
    } catch (e) {
      console.error("Error fetching places: ", e);
      return [];
    }
  },

  // === RECIPES ===
  async getRecipes() {
    try {
      if(!db) return [];
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipes = [];
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      return recipes;
    } catch (e) {
      console.error("Error fetching recipes: ", e);
      return [];
    }
  },

  // === PRODUCTS ===
  async getProducts() {
    try {
      if(!db) return [];
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (e) {
      console.error("Error fetching products: ", e);
      return [];
    }
  },

  // === FAVORITES ===
  async getUserFavorites(userId) {
    try {
      if(!db) return [];
      const q = query(collection(db, "favorites"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      const favs = [];
      querySnapshot.forEach((doc) => {
        favs.push({ id: doc.id, ...doc.data() });
      });
      return favs;
    } catch (e) {
      console.error("Error fetching favorites: ", e);
      return [];
    }
  },

  async addFavorite(userId, itemId, type) {
    try {
      if(!db) return null;
      const docRef = await addDoc(collection(db, "favorites"), {
        user_id: userId,
        item_id: itemId,
        type: type, // 'place' or 'recipe'
        created_at: new Date().toISOString()
      });
      return docRef.id;
    } catch (e) {
      console.error("Error adding favorite: ", e);
      return null;
    }
  },
  
  // === SEEDING HELPERS (For Mock Data to Firebase) ===
  async seedCollection(collectionName, dataArray) {
    if(!db) return;
    try {
      for (const item of dataArray) {
        // use item.id as document id if possible
        const itemId = item.id ? item.id.toString() : doc(collection(db, collectionName)).id;
        await setDoc(doc(db, collectionName, itemId), item);
      }
      console.log(`✅ Seeded ${collectionName} successfully.`);
    } catch (error) {
      console.error(`Error seeding ${collectionName}: `, error);
    }
  }
};

export default dbService;
