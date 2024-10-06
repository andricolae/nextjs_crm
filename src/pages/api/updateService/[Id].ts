import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handlerUpdateService(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { Id } = req.query;
            const { Name, Description, Price } = req.body;

            if (typeof Id !== 'string') {
                return res.status(400).json({ message: 'Invalid ID' });
            }

            if (!Name || !Description || !Price) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const [result]: any = await pool.query(
                'UPDATE Service SET Name = ?, Description = ?, Price = ? WHERE Id = ?',
                [Name, Description, Price, Id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Service not found' });
            }

            res.status(200).json({ message: 'Service updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating service' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
