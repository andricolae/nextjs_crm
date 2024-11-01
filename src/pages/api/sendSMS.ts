import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioClient = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { to, message } = req.body;

        try {
            const messageResponse = await twilioClient.messages.create({
                body: message,
                to: to, // Text this number
                from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
            });

            res.status(200).json({ success: true, messageSid: messageResponse.sid });
        } catch (error: any) {
            console.error('Error sending SMS:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

