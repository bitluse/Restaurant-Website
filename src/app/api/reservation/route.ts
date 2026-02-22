import { NextRequest, NextResponse } from 'next/server';
import { reservationSchema } from '@/lib/validations';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = reservationSchema.parse(body);
    
    // Check if the date is in the future
    const reservationDate = new Date(validatedData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (reservationDate < today) {
      return NextResponse.json(
        { success: false, error: 'Reservation date must be in the future' },
        { status: 400 }
      );
    }
    
    // Save to database
    const reservation = await db.reservation.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        date: validatedData.date,
        time: validatedData.time,
        guests: validatedData.guests,
        occasion: validatedData.occasion,
        specialRequests: validatedData.specialRequests,
        status: 'confirmed',
      },
    });
    
    // In production, you would also:
    // 1. Send confirmation email
    // 2. Send SMS notification
    // 3. Integrate with restaurant management system
    
    return NextResponse.json({
      success: true,
      message: 'Reservation confirmed successfully!',
      data: {
        id: reservation.id,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        status: reservation.status,
      },
    });
  } catch (error) {
    console.error('Reservation error:', error);
    
    if (error instanceof Error && 'errors' in error) {
      return NextResponse.json(
        { success: false, errors: (error as any).errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

// GET endpoint to view reservations (for admin)
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication here
    const reservations = await db.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    
    return NextResponse.json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}
