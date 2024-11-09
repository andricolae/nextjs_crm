import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const response = NextResponse.json({ message: 'Logout successful' });

    // Set the cookie to invalidate
    response.headers.set(
        'Set-Cookie',
        serialize('enkot', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1, // Invalidate the cookie
            path: '/',
        })
    );

    return response;
}

export function OPTIONS() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
