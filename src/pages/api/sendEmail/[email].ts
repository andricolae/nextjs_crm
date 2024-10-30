import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';
import SendEmailTask from '@/components/common/SendEmailTask';

export default async function handlerSendEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { email } = req.query;
            const { Message, Code } = req.body;

            if (typeof email !== 'string') {
                return res.status(400).json({ message: 'Invalid email' });
            }

            if (!Message || !Code) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const emailTask = new SendEmailTask('office@brandtransilvania.ro', 'Vll%Z07Px5x(', email, 'Email Subject', Code);
            emailTask.execute();

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
