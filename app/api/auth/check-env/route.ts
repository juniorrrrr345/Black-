import { NextResponse } from 'next/server';

export async function GET() {
  const envUsername = process.env.ADMIN_USERNAME;
  const envPassword = process.env.ADMIN_PASSWORD;
  
  return NextResponse.json({
    configured: !!(envUsername && envPassword),
    hasUsername: !!envUsername,
    hasPassword: !!envPassword,
    usernameValue: envUsername || 'NOT_SET',
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    message: !envUsername || !envPassword 
      ? '⚠️ ADMIN_USERNAME ou ADMIN_PASSWORD ne sont pas définis. Vérifiez vos variables d\'environnement sur Vercel.' 
      : '✅ Les variables d\'environnement sont configurées correctement. Username: ' + envUsername
  });
}