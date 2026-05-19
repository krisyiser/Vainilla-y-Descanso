import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo aplicamos CORS a las rutas de la API
  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    const response = NextResponse.next();

    // Permitimos peticiones desde cualquier origen para facilitar el desarrollo con Tauri
    // En producción deberías restringir esto a los orígenes específicos de tu Dashboard
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Manejo de peticiones preflight (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: response.headers });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
