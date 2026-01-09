import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';

// Function to send Telegram notification
async function sendTelegramNotification(consultation: {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: number;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Skip if Telegram is not configured
  if (!botToken || !chatId) {
    console.warn('⚠️ Telegram not configured:', {
      hasBotToken: !!botToken,
      hasChatId: !!chatId,
      env: process.env.NODE_ENV
    });
    return;
  }

  console.log('📤 Sending Telegram notification...');

  try {
    const date = new Date(consultation.createdAt).toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const telegramMessage = `
🔔 <b>YÊU CẦU TƯ VẤN MỚI</b>

👤 <b>Tên:</b> ${consultation.name}
📧 <b>Email:</b> ${consultation.email}
📱 <b>Số điện thoại:</b> ${consultation.phone}
💬 <b>Nội dung:</b> ${consultation.message || 'Không có'}

🕐 <b>Thời gian:</b> ${date}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Telegram API error:', errorData);
    } else {
      console.log('✅ Telegram notification sent successfully');
    }
  } catch (error) {
    console.error('❌ Error sending Telegram notification:', error);
    // Don't throw error - we don't want to fail the request if Telegram fails
  }
}

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

    // Send Telegram notification (non-blocking)
    sendTelegramNotification(consultation).catch((error) => {
      console.error('Failed to send Telegram notification:', error);
    });

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
