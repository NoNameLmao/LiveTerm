import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { path: filePath } = req.query;
    const fullPath = path.join(process.cwd(), 'fs', filePath as string);
    try {
        const text = await fs.readFile(fullPath, 'utf-8');
        res.status(200).json({ text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read file' });
    }
}
