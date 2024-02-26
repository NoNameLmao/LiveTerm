import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const directoryPath = path.join(
            process.cwd(),
            'fs',
            req.query.path ? `/${req.query.path}/` : '/',
        );
        const files: string[] = [];
        const folders: string[] = [];

        const items: string[] = await fs.readdir(directoryPath);

        for (const item of items) {
            const itemPath: string = path.join(directoryPath, item);
            const itemStats = await fs.stat(itemPath);
            if (itemStats.isDirectory()) {
                folders.push(item);
            } else {
                files.push(item);
            }
        }

        res.status(200).json({ files, folders });
    } catch (error) {
        res.status(500).json({
            files: [],
            folders: [],
            error: 'Failed to read directory',
        });
    }
}
