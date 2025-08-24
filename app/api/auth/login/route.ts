import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check environment variables first - PRIORITY
    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;

    console.log('Auth attempt:', { 
      username, 
      hasEnvUsername: !!envUsername, 
      hasEnvPassword: !!envPassword,
      envUsername: envUsername || 'NOT_SET'
    });

    // If environment variables are set, use them for authentication
    if (envUsername && envPassword) {
      if (username === envUsername && password === envPassword) {
        console.log('✅ Login successful with env variables');
        
        // Generate token for env-based admin
        const token = generateToken({
          userId: 'env-admin',
          username: envUsername,
        });

        // Create response with token
        const response = NextResponse.json(
          { 
            success: true,
            token,
            user: {
              id: 'env-admin',
              username: envUsername,
            }
          },
          { status: 200 }
        );

        // Set cookie
        response.cookies.set('auth-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 86400, // 24 hours
          path: '/',
        });

        return response;
      } else {
        console.log('❌ Credentials do not match env variables');
        // Don't fall back to database if env vars are set but wrong
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    }

    // Only use database if env variables are not set
    console.log('⚠️ No env variables, falling back to database');
    await dbConnect();

    // Find admin by username
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: admin._id.toString(),
      username: admin.username,
    });

    // Create response with token
    const response = NextResponse.json(
      { 
        success: true,
        token,
        user: {
          id: admin._id,
          username: admin.username,
        }
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}