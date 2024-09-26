import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handlerClients(req: NextApiRequest, res: NextApiResponse) {
    try {
        const [rows] = await pool.query('SELECT * FROM Client');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}
