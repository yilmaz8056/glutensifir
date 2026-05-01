const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Glütensiz Karabuğday Patlağı",
        brand: "Wefood",
        status: "safe",
        description: "Bu ürün tamamen glütensizdir ve çölyak hastaları için güvenlidir. Üretim bandı ayrıdır."
    },
    {
        id: 2,
        name: "Sütlü Çikolata",
        brand: "X Marka",
        status: "warning",
        description: "İçeriğinde glüten yok ancak 'Eser miktarda glüten içerebilir' uyarısı mevcuttur. Çapraz bulaşma riski var."
    },
    {
        id: 3,
        name: "Yulaf Ezmesi",
        brand: "Y Marka",
        status: "danger",
        description: "Glütensiz sertifikası yoktur. Yulaf doğası gereği çapraz bulaşmaya çok müsaittir, tüketilmesi risklidir."
    },
    {
        id: 4,
        name: "Pirinç Unu",
        brand: "Glutensiz Ada",
        status: "safe",
        description: "%100 Çölyak derneği onaylı ve güvenlidir."
    }
];

// Helper to get random product for mock scanner
function getRandomMockProduct() {
    const randomIndex = Math.floor(Math.random() * MOCK_PRODUCTS.length);
    return MOCK_PRODUCTS[randomIndex];
}
