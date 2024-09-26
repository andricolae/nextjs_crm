import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handlerInsertClients(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests } = req.body;

            if (!FirstName || !LastName || !CI || !CNP || !CompanyId || !CompanyRole || !Address || !Email || !Phone || !Interests) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const [result]: any = await pool.query(
                'INSERT INTO Client (FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests]
            );

            if (result.affectedRows === 0) {
                return res.status(500).json({ message: 'Failed to insert company info' });
            }

            res.status(201).json({ message: 'Company info inserted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error inserting company info' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
