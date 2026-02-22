import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Save to database
    const contactMessage = await db.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });
    
    // In production, you would also:
    // 1. Send notification email to restaurant
    // 2. Send auto-reply to customer
    // 3. Integrate with CRM
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: contactMessage.id,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && 'errors' in error) {
      return NextResponse.json(
        { success: false, errors: (error as any).errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// GET endpoint to view contact messages (for admin)
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication here
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    
    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
