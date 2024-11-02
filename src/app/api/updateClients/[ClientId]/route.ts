import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(req: Request, { params }: { params: { ClientId: string } }) {
    const { ClientId } = params;
    const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests } = await req.json();

    if (typeof ClientId !== 'string') {
        return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    if (!FirstName || !LastName || !CI || !CNP || !CompanyId || !CompanyRole || !Address || !Email || !Phone || !Interests) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const [result]: any = await pool.query(
            'UPDATE Client SET FirstName = ?, LastName = ?, CI = ?, CNP = ?, CompanyId = ?, CompanyRole = ?, Address = ?, Email = ?, Phone = ?, Interests = ? WHERE ClientId = ?',
            [FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, ClientId]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Client not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Client updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json({ message: 'Error updating client' }, { status: 500 });
    }
}
