window.MOCK_DEALS = [
    { id: 1, title: "A101 - Wefood Glutensiz Un", discount: "%50 İndirim", market: "A101", isPremium: false, icon: "ph-storefront" },
    { id: 2, title: "Migros - Schär Ekmek", discount: "1 Alana 1 Bedava", market: "Migros", isPremium: true, icon: "ph-shopping-cart" },
    { id: 3, title: "BİM - Karabuğday Patlağı", discount: "Stoklara Girdi (19.90 TL)", market: "BİM", isPremium: true, icon: "ph-tag" }
];

window.MOCK_PRODUCTS = [
  { id: 1, name: "Glutensiz Un Karışımı", brand: "Schär", category: "un", status: "safe", barcode: "8008698001234", description: "Ekmek ve hamur işleri için uygun" },
  { id: 2, name: "Glutensiz Spagetti", brand: "Barilla", category: "makarna", status: "safe", barcode: "8076802085738", description: "Mısır ve pirinç bazlı" },
  { id: 3, name: "Glutensiz Penne", brand: "Barilla", category: "makarna", status: "safe", barcode: "8076802085745", description: "Pirinç unu içerir" },
  { id: 4, name: "Glutensiz Bisküvi", brand: "Eti Pronot", category: "atıştırmalık", status: "safe", barcode: "8690526090012", description: "Çölyak dostu atıştırmalık" },
  { id: 5, name: "Glutensiz Kraker", brand: "Schär", category: "atıştırmalık", status: "safe", barcode: "8008698002222", description: "Glutensiz sertifikalı" },
  { id: 6, name: "Glutensiz Ekmek", brand: "Schär", category: "ekmek", status: "safe", barcode: "8008698003333", description: "Hazır dilimlenmiş" },
  { id: 7, name: "Glutensiz Lavaş", brand: "Feel Free", category: "ekmek", status: "safe", barcode: "8691234567890", description: "Wrap için uygun" },
  { id: 8, name: "Glutensiz Yulaf Ezmesi", brand: "Natura", category: "kahvaltılık", status: "safe", barcode: "8698765432101", description: "Kontamine edilmemiş yulaf" },
  { id: 9, name: "Glutensiz Granola", brand: "Züber", category: "kahvaltılık", status: "safe", barcode: "8690000000001", description: "Şekersiz seçenek mevcut" },
  { id: 10, name: "Glutensiz Kek Karışımı", brand: "Dr. Oetker", category: "hazır_karışım", status: "safe", barcode: "8690632000001", description: "Evde kolay kek yapımı" },
  { id: 11, name: "Glutensiz Kurabiye", brand: "Schär", category: "tatlı", status: "safe", barcode: "8008698004444", description: "Çocuklar için uygun" },
  { id: 12, name: "Glutensiz Pizza Tabanı", brand: "Schär", category: "hazır_ürün", status: "safe", barcode: "8008698005555", description: "Fırında hazırlanır" },
  { id: 13, name: "Glutensiz Mısır Gevreği", brand: "Nesquik", category: "kahvaltılık", status: "warning", barcode: "8691111111111", description: "İçerik kontrol edilmeli. Çapraz bulaşma riski olabilir." },
  { id: 14, name: "Glutensiz Çikolata", brand: "Ülker", category: "tatlı", status: "warning", barcode: "8692222222222", description: "Bazı ürünler gluten içerebilir. Çapraz bulaşma riski var." },
  { id: 15, name: "Glutensiz Noodle", brand: "King Soba", category: "makarna", status: "safe", barcode: "5031412000000", description: "Pirinç bazlı noodle" },
  { id: 16, name: "Glutensiz Pirinç Unu", brand: "Bağdat", category: "un", status: "safe", barcode: "8693333333333", description: "Tatlılar için uygun" },
  { id: 17, name: "Glutensiz Mısır Unu", brand: "Bağdat", category: "un", status: "safe", barcode: "8694444444444", description: "Karadeniz mutfağında kullanılır" },
  { id: 18, name: "Glutensiz Tahin", brand: "Koska", category: "kahvaltılık", status: "safe", barcode: "8695555555555", description: "Doğal ürün" },
  { id: 19, name: "Glutensiz Pekmez", brand: "Koska", category: "kahvaltılık", status: "safe", barcode: "8696666666666", description: "Enerji kaynağı" },
  { id: 20, name: "Glutensiz Cips", brand: "Lay's", category: "atıştırmalık", status: "warning", barcode: "8697777777777", description: "Etiket kontrol edilmeli. Çapraz bulaşma riski olabilir." }
];

// Helper to get random product for mock scanner
function getRandomMockProduct() {
    const randomIndex = Math.floor(Math.random() * window.MOCK_PRODUCTS.length);
    return window.MOCK_PRODUCTS[randomIndex];
}

window.MOCK_PLACES = [
    // %100 Glutensiz Mekanlar
    { id: 1, name: "Guru Glutensiz Moda", type: "100% GF", safety: "safe", safetyScore: 99, rating: 4.9, icon: "ph-star-fill", lat: 40.9840, lng: 29.0250 },
    { id: 2, name: "d’Amalfi Senza Glutine", type: "100% GF", safety: "safe", safetyScore: 98, rating: 4.8, icon: "ph-star-fill", lat: 40.9650, lng: 29.0650 },
    { id: 3, name: "Mona Mina Suadiye", type: "100% GF", safety: "safe", safetyScore: 100, rating: 4.9, icon: "ph-star-fill", lat: 40.9610, lng: 29.0830 },
    { id: 4, name: "Tatlı Fırın Cadde", type: "100% GF", safety: "safe", safetyScore: 95, rating: 4.7, icon: "ph-star-fill", lat: 40.9570, lng: 29.0910 },
    { id: 5, name: "Tatlı Fırın Ataköy", type: "100% GF", safety: "safe", safetyScore: 94, rating: 4.6, icon: "ph-star-fill", lat: 40.9850, lng: 28.8450 },
    { id: 6, name: "Glutensiz.com Etiler", type: "100% GF", safety: "safe", safetyScore: 99, rating: 4.9, icon: "ph-star-fill", lat: 41.0820, lng: 29.0320 },
    { id: 7, name: "Rolla GlutenFree", type: "100% GF", safety: "safe", safetyScore: 97, rating: 4.8, icon: "ph-star-fill", lat: 40.9880, lng: 29.0210 },
    { id: 8, name: "Guru Glutensiz", type: "100% GF", safety: "safe", safetyScore: 99, rating: 4.9, icon: "ph-star-fill", lat: 40.9820, lng: 29.0270 },
    
    // GF Seçeneği Sunan Mekanlar
    { id: 9, name: "Cafe Amedros", type: "Seçenek Sunar", safety: "warning", safetyScore: 65, rating: 4.3, icon: "ph-warning-circle", lat: 41.0080, lng: 28.9770 },
    { id: 10, name: "Arch Bistro", type: "Seçenek Sunar", safety: "warning", safetyScore: 70, rating: 4.5, icon: "ph-warning-circle", lat: 41.0050, lng: 28.9760 },
    { id: 11, name: "Suad Restaurant", type: "Seçenek Sunar", safety: "warning", safetyScore: 68, rating: 4.4, icon: "ph-warning-circle", lat: 40.9620, lng: 29.0800 },
    { id: 12, name: "Vegan Dükkan Lokanta", type: "Seçenek Sunar", safety: "warning", safetyScore: 85, rating: 4.6, icon: "ph-warning-circle", lat: 41.0310, lng: 28.9810 },
    { id: 13, name: "Enjoy Cafe", type: "Kafe & Fırın", safety: "warning", safetyScore: 60, rating: 4.2, icon: "ph-warning-circle", lat: 41.0380, lng: 28.9830 },
    { id: 14, name: "Zencefil Restaurant", type: "Kafe & Fırın", safety: "warning", safetyScore: 75, rating: 4.3, icon: "ph-warning-circle", lat: 41.0360, lng: 28.9800 }
];

window.MOCK_RECIPES = [
  {
    "id": 1,
    "name": "Menemen",
    "category": "kahvaltı",
    "prep_time": "15 dk",
    "difficulty": "kolay",
    "calories": 210,
    "serving": 2,
    "protein": "9g", "carbs": "8g", "fat": "15g",
    "image": "https://source.unsplash.com/featured/?menemen",
    "ingredients": [
      "3 yumurta",
      "2 domates",
      "2 yeşil biber",
      "1 yemek kaşığı zeytinyağı",
      "Tuz"
    ],
    "steps": [
      "Biberleri doğra ve kavur",
      "Domatesleri ekle",
      "Yumurtaları kır",
      "Karıştırarak pişir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 2,
    "name": "Mercimek Çorbası",
    "category": "çorba",
    "prep_time": "30 dk",
    "difficulty": "kolay",
    "calories": 180,
    "serving": 4,
    "protein": "9g", "carbs": "28g", "fat": "4g",
    "image": "https://source.unsplash.com/featured/?lentil-soup",
    "ingredients": [
      "1 su bardağı kırmızı mercimek",
      "1 soğan",
      "1 havuç",
      "1 yemek kaşığı zeytinyağı",
      "6 su bardağı su"
    ],
    "steps": [
      "Sebzeleri kavur",
      "Mercimeği ekle",
      "Suyu koy",
      "Kaynat ve blenderdan geçir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 3,
    "name": "Fırında Tavuk Sebze",
    "category": "ana_yemek",
    "prep_time": "45 dk",
    "difficulty": "kolay",
    "calories": 360,
    "serving": 4,
    "protein": "30g", "carbs": "12g", "fat": "22g",
    "image": "https://source.unsplash.com/featured/?roasted-chicken",
    "ingredients": [
      "500g tavuk",
      "2 patates",
      "1 havuç",
      "1 kabak",
      "Zeytinyağı",
      "Baharat"
    ],
    "steps": [
      "Sebzeleri doğra",
      "Tavukla karıştır",
      "Baharat ekle",
      "Fırında pişir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 4,
    "name": "Zeytinyağlı Fasulye",
    "category": "zeytinyağlı",
    "prep_time": "35 dk",
    "difficulty": "kolay",
    "calories": 220,
    "serving": 4,
    "protein": "6g", "carbs": "30g", "fat": "8g",
    "image": "https://source.unsplash.com/featured/?green-beans",
    "ingredients": [
      "500g taze fasulye",
      "1 domates",
      "1 soğan",
      "Zeytinyağı"
    ],
    "steps": [
      "Soğanı kavur",
      "Fasulyeyi ekle",
      "Domates ekle",
      "Pişir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 5,
    "name": "Sütlaç",
    "category": "tatlı",
    "prep_time": "40 dk",
    "difficulty": "orta",
    "calories": 260,
    "serving": 6,
    "protein": "6g", "carbs": "40g", "fat": "5g",
    "image": "https://source.unsplash.com/featured/?rice-pudding",
    "ingredients": [
      "1 litre süt",
      "1 çay bardağı pirinç",
      "1 su bardağı şeker"
    ],
    "steps": [
      "Pirinci haşla",
      "Süt ekle",
      "Şekeri koy",
      "Kıvam alınca servis et"
    ],
    "is_gluten_free": true
  },
  {
    "id": 6,
    "name": "Karnıyarık",
    "category": "ana_yemek",
    "prep_time": "50 dk",
    "difficulty": "orta",
    "calories": 390,
    "serving": 4,
    "protein": "18g", "carbs": "10g", "fat": "22g",
    "image": "https://source.unsplash.com/featured/?eggplant",
    "ingredients": [
      "4 patlıcan",
      "250g kıyma",
      "1 soğan",
      "2 domates"
    ],
    "steps": [
      "Patlıcanları kızart",
      "İç harcı hazırla",
      "Doldur",
      "Fırında pişir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 7,
    "name": "Nohut Yemeği",
    "category": "ana_yemek",
    "prep_time": "40 dk",
    "difficulty": "kolay",
    "calories": 310,
    "serving": 4,
    "protein": "12g", "carbs": "45g", "fat": "6g",
    "image": "https://source.unsplash.com/featured/?chickpeas",
    "ingredients": [
      "2 su bardağı nohut",
      "1 soğan",
      "Salça",
      "Zeytinyağı"
    ],
    "steps": [
      "Soğanı kavur",
      "Salça ekle",
      "Nohutu koy",
      "Pişir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 8,
    "name": "Yoğurtlu Kabak",
    "category": "meze",
    "prep_time": "15 dk",
    "difficulty": "kolay",
    "calories": 140,
    "serving": 2,
    "protein": "6g", "carbs": "10g", "fat": "8g",
    "image": "https://source.unsplash.com/featured/?zucchini",
    "ingredients": [
      "2 kabak",
      "1 kase yoğurt",
      "Sarımsak"
    ],
    "steps": [
      "Kabakları rendele",
      "Sotele",
      "Yoğurtla karıştır"
    ],
    "is_gluten_free": true
  },
  {
    "id": 9,
    "name": "Glutensiz Kek",
    "category": "tatlı",
    "prep_time": "45 dk",
    "difficulty": "orta",
    "calories": 320,
    "serving": 8,
    "protein": "5g", "carbs": "45g", "fat": "10g",
    "image": "https://source.unsplash.com/featured/?gluten-free-cake",
    "ingredients": [
      "2 yumurta",
      "1 su bardağı glutensiz un",
      "1 çay bardağı süt",
      "Kabartma tozu"
    ],
    "steps": [
      "Malzemeleri karıştır",
      "Kalıba dök",
      "Fırında pişir"
    ],
    "is_gluten_free": true
  },
  {
    "id": 10,
    "name": "Pirinç Pilavı",
    "category": "yan_yemek",
    "prep_time": "20 dk",
    "difficulty": "kolay",
    "calories": 200,
    "serving": 4,
    "protein": "4g", "carbs": "40g", "fat": "2g",
    "image": "https://source.unsplash.com/featured/?rice",
    "ingredients": [
      "2 su bardağı pirinç",
      "Tereyağı",
      "4 su bardağı su"
    ],
    "steps": [
      "Pirinci yıka",
      "Kavur",
      "Suyu ekle",
      "Demlendir"
    ],
    "is_gluten_free": true
  }
];
