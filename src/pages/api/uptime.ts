import { NextApiResponse } from 'next';

export default async function handler(_, res: NextApiResponse) {
    try {
        const uptime = process.uptime();
        res.json({ uptime });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
