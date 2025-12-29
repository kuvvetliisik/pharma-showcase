import fs from 'fs/promises';
import path from 'path';
import { products as initialProducts, brands as initialBrands, Product, Brand } from './data';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface Message {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    subjectLabel: string;
    message: string;
    date: string;
    read: boolean;
}

export interface Slider {
    id: string;
    image: string;
    order: number;
    active: boolean;
}

export interface DbSchema {
    products: Product[];
    brands: Brand[];
    messages: Message[];
    sliders: Slider[];
}

// Get subject label from subject value
function getSubjectLabel(subject: string): string {
    const labels: Record<string, string> = {
        'genel': 'Genel Bilgi',
        'bayilik': 'Bayilik Başvurusu',
        'urun-bilgisi': 'Ürün Bilgisi Talebi',
        'sikayet': 'Şikayet / Öneri'
    };
    return labels[subject] || 'Diğer';
}

// Ensure the directory exists
async function ensureDb() {
    try {
        await fs.access(DB_PATH);
        // Check if messages and sliders arrays exist, if not add them
        const data = await fs.readFile(DB_PATH, 'utf-8');
        const parsed = JSON.parse(data);
        let needsSave = false;
        if (!parsed.messages) {
            parsed.messages = [];
            needsSave = true;
        }
        if (!parsed.sliders) {
            parsed.sliders = [];
            needsSave = true;
        }
        if (needsSave) {
            await fs.writeFile(DB_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
        }
    } catch {
        // File doesn't exist, create it with initial data
        const initialData: DbSchema = {
            products: initialProducts,
            brands: initialBrands,
            messages: [],
            sliders: []
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

export { getSubjectLabel };
