const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

console.log("Testing DB connection...");
console.log("DB Path:", DB_PATH);

try {
    if (fs.existsSync(DB_PATH)) {
        console.log("SUCCESS: db.json exists.");
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        const json = JSON.parse(data);
        console.log(`SUCCESS: Read db.json. Found ${json.products?.length} products and ${json.brands?.length} brands.`);

        // Try writing
        const testProduct = { id: "test-id", name: "Test Product", brandId: "b1", category: "Test", description: "desc", image: "" };
        json.products.push(testProduct);
        fs.writeFileSync(DB_PATH, JSON.stringify(json, null, 2), 'utf-8');
        console.log("SUCCESS: perform write operation.");

        // Cleanup
        json.products = json.products.filter(p => p.id !== "test-id");
        fs.writeFileSync(DB_PATH, JSON.stringify(json, null, 2), 'utf-8');
        console.log("SUCCESS: validation & cleanup complete.");

    } else {
        console.error("ERROR: db.json does not exist. The app should have created it.");
    }
} catch (error) {
    console.error("FAIL: An error occurred:", error);
}
