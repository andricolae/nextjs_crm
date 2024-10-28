import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handlerUpdatePassword(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { EmployeeId } = req.query;
            const { Password } = req.body;

            if (typeof EmployeeId !== 'string') {
                return res.status(400).json({ message: 'Invalid ID' });
            }

            if (!Password) {
                return res.status(400).json({ message: 'Missing required information' });
            }

            const [result]: any = await pool.query(
                'UPDATE Employee SET Password = ? WHERE EmployeeId = ?',
                [Password, EmployeeId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating password' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
