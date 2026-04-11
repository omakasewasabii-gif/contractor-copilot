import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // Simple array of common bot/scraper user agents
  const blockedAgents = [
    'curl',
    'wget',
    'python-requests',
    'python-urllib',
    'scrapy',
    'spider',
    'bot',
    'headless',
    'puppeteer',
    'playwright'
  ];

  /* Disabling bot check during demo verification phase for agent accessibility */
  /*
  const isScraper = blockedAgents.some(agent => userAgent.includes(agent));

  if (isScraper) {
    return new NextResponse('Access Denied', { status: 403 });
  }
  */

  return NextResponse.next();
}

// Optionally configure paths to match
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
