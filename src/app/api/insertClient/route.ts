import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(req: Request) {
    const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests } = await req.json();

    if (!FirstName || !LastName || !CI || !CNP || !CompanyId || !CompanyRole || !Address || !Email || !Phone || !Interests) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const [result]: any = await pool.query(
            'INSERT INTO Client (FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Failed to insert company info' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Company info inserted successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error inserting company info:', error);
        return NextResponse.json({ message: 'Error inserting company info' }, { status: 500 });
    }
}
