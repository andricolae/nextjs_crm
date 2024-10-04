import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handlerInsertClients(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { Name, Description, Price } = req.body;

            if (!Name || !Description || !Price) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const [result]: any = await pool.query(
                'INSERT INTO Service (Name, Description, Price) VALUES (?, ?, ?)',
                [Name, Description, Price]
            );

            if (result.affectedRows === 0) {
                return res.status(500).json({ message: 'Failed to insert new service' });
            }

            res.status(201).json({ message: 'Service inserted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error inserting service info' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
