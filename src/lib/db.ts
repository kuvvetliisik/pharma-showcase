import fs from 'fs/promises';
import path from 'path';
import { products as initialProducts, brands as initialBrands, Product, Brand } from './data';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface DbSchema {
    products: Product[];
    brands: Brand[];
}

// Ensure the directory exists
async function ensureDb() {
    try {
        await fs.access(DB_PATH);
    } catch {
        // File doesn't exist, create it with initial data
        const initialData: DbSchema = {
            products: initialProducts,
            brands: initialBrands
        };
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    }
}

export async function getDb(): Promise<DbSchema> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function saveDb(data: DbSchema): Promise<void> {
    await ensureDb();
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
