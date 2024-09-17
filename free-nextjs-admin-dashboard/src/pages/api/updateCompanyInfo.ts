import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handlerUpdateCompanyInfo(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { CompanyId } = req.query;
            const { CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests } = req.body;

            if (typeof CompanyId !== 'string') {
                return res.status(400).json({ message: 'Invalid ID' });
            }

            if (!CompanyName || !TVA || !Shareholders || !CIF || !COM || !Headquarter || !Subsidiary || !MainActivity || !SecondaryActivity || !Interests) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const result = await pool.query(
                'UPDATE CompanyInfo SET name = ?, email = ?, phone = ? WHERE CompanyId = ?',
                [CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, CompanyId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Company info not found' });
            }

            res.status(200).json({ message: 'Company info updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating company info' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
