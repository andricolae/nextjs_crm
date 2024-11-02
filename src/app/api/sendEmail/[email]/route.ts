import { NextResponse } from 'next/server';
import SendEmailTask from '@/components/common/SendEmailTask';

export async function PUT(request: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;
        const { Subject, EmailText } = await request.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
        }

        if (!Subject || !EmailText) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const emailTask = new SendEmailTask(
            'office@brandtransilvania.ro',
            'Vll%Z07Px5x(',
            email,
            Subject,
            EmailText
        );
        await emailTask.execute();

        return NextResponse.json({ message: 'Client updated successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating client' }, { status: 500 });
    }
}
