const fs = require('fs');
let content = fs.readFileSync('js/mockData.js', 'utf8');

// Extract current arrays
let MOCK_PRODUCTS = [];
let MOCK_PLACES = [];
let MOCK_RECIPES = [];

eval(content + '; MOCK_PRODUCTS_ext=MOCK_PRODUCTS; MOCK_PLACES_ext=MOCK_PLACES; MOCK_RECIPES_ext=MOCK_RECIPES;');

MOCK_RECIPES_ext.forEach(r => {
    r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' turkish food plate delicious realistic')}?width=400&height=300&nologo=true`;
});

MOCK_PLACES_ext.forEach((p, i) => {
    p.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(p.name + ' cozy cafe interior gluten free restaurant realistic')}?width=400&height=300&nologo=true&seed=${i}`;
});

function getRandomMockProductString() {
    return `// Helper to get random product for mock scanner
function getRandomMockProduct() {
    const randomIndex = Math.floor(Math.random() * MOCK_PRODUCTS.length);
    return MOCK_PRODUCTS[randomIndex];
}`;
}

const newContent = `const MOCK_PRODUCTS = ${JSON.stringify(MOCK_PRODUCTS_ext, null, 4)};\n\n` +
                   getRandomMockProductString() + `\n\n` +
                   `const MOCK_PLACES = ${JSON.stringify(MOCK_PLACES_ext, null, 4)};\n\n` +
                   `const MOCK_RECIPES = ${JSON.stringify(MOCK_RECIPES_ext, null, 4)};\n`;

fs.writeFileSync('js/mockData.js', newContent);
console.log('Done');
