import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase.admin';
import { z } from 'zod';

const LeadSchema = z.object({
  type: z.enum(['catering', 'general', 'career']),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().optional(),
  eventDate: z.string().optional(),
  headcount: z.number().optional(),
  budgetRange: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LeadSchema.parse(body);

    // Add to Firestore
    const doc = await adminDb.collection('leads').add({
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    // Optional: Trigger notifications via webhook or email service
    // This would normally be handled by Firebase Functions
    // For now, we'll just return success

    return NextResponse.json(
      { success: true, id: doc.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}




