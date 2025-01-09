import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function middleware(request) {
    const rawCookies = request.headers.get('cookie');
    // console.log('Raw Cookies:', rawCookies); 

    const cookies = cookie.parse(rawCookies || '');
    const token = cookies.token;
    console.log('Parsed Token:', cookies);
    
    const path = request.nextUrl.pathname;
    const publicPaths = ['/auth/signin', '/auth/signup', '/auth/verifyemail'];

    let role=null;
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1])); 
            console.log(decoded);
            role = decoded.role; 
        } catch (error) {
            console.error('Error decoding token:', error.message);
        }
    }
    if (token && publicPaths.includes(path)) {
        if (role) {
            return NextResponse.redirect(new URL('/admin', request.url));
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    if (path.startsWith("/admin")) {
        if (!token || !role) {
            return NextResponse.redirect(new URL('/', request.url));
        }
      }

    if (!token && !publicPaths.includes(path)) {
        console.log('Redirecting to sign-in page');
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    console.log('Allowing request to proceed');
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/auth/:path*','/admin'], // Adjust matcher as needed
};
