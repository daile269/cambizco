import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Create consultation object
    const consultation = {
      name,
      email,
      phone,
      message: message || '',
      createdAt: Date.now(),
      status: 'pending',
    };

    // Save to Firebase
    const consultationsRef = ref(database, 'consultations');
    const newConsultationRef = push(consultationsRef);
    await set(newConsultationRef, consultation);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm.',
        id: newConsultationRef.key 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving consultation:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
