import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handlerUpdateClient(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { ClientId } = req.query;
            const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests } = req.body;

            if (typeof ClientId !== 'string') {
                return res.status(400).json({ message: 'Invalid ID' });
            }

            if (!FirstName || !LastName || !CI || !CNP || !CompanyId || !CompanyRole || !Address || !Email || !Phone || !Interests) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const [result]: any = await pool.query(
                'UPDATE Client SET FirstName = ?, LastName = ?, CI = ?, CNP = ?, CompanyId = ?, CompanyRole = ?, Address = ?, Email = ?, Phone = ?, Interests = ? WHERE ClientId = ?',
                [FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, ClientId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Client not found' });
            }

            res.status(200).json({ message: 'Client updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating client' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
