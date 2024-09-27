import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handlerLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { Email, Password } = req.body;

            if (!Email || !Password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const [result]: any = await pool.query(
                'SELECT * FROM Employee WHERE Email = ? AND Password = ?',
                [Email, Password]
            );

            console.log(result);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
