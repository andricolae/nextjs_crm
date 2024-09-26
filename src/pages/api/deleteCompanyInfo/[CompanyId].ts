import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handlerDeleteCompanyInfo(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            // You can pass the `id` via the request body or query, here we expect it from the query.
            const { CompanyId } = req.query;

            if (!CompanyId) {
                return res.status(400).json({ message: 'CompanyInfo ID is required' });
            }

            const [result]: any = await pool.query('DELETE FROM CompanyInfo WHERE CompanyId = ?', [CompanyId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'CompanyInfo not found' });
            }

            res.status(200).json({ message: 'CompanyInfo deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting CompanyInfo' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
