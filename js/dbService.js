// Firestore Database Service (Compat versiyonu için global)
const dbService = {
  // === PLACES ===
  async getPlaces() {
    try {
      if(!window.firebaseDb) return [];
      const querySnapshot = await window.firebaseDb.collection("places").get();
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
      if(!window.firebaseDb) return [];
      const querySnapshot = await window.firebaseDb.collection("recipes").get();
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
      if(!window.firebaseDb) return [];
      const querySnapshot = await window.firebaseDb.collection("products").get();
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
      if(!window.firebaseDb) return [];
      const querySnapshot = await window.firebaseDb.collection("favorites")
          .where("user_id", "==", userId)
          .get();
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
      if(!window.firebaseDb) return null;
      const docRef = await window.firebaseDb.collection("favorites").add({
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
    if(!window.firebaseDb) return;
    try {
      for (const item of dataArray) {
        // use item.id as document id if possible
        const itemId = item.id ? item.id.toString() : window.firebaseDb.collection(collectionName).doc().id;
        await window.firebaseDb.collection(collectionName).doc(itemId).set(item);
      }
      console.log(`✅ Seeded ${collectionName} successfully.`);
    } catch (error) {
      console.error(`Error seeding ${collectionName}: `, error);
    }
  }
};

window.dbService = dbService;
