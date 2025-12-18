"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function EventPost() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white py-4 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Sự kiện công ty</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Sự kiện
              </span>
              <span className="text-gray-500">05/12/2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sự Kiện Gặp Mặt Đối Tác Cuối Năm 2025
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src="/e11.jpg"
              alt="Sự kiện công ty"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Ngày 05/12/2025, CamBiz đã tổ chức thành công sự kiện gặp mặt
                đối tác và tri ân khách hàng cuối năm. Đây là dịp để chúng tôi
                gửi lời cảm ơn chân thành đến tất cả các đối tác, khách hàng đã
                tin tưởng và đồng hành cùng CamBiz trong suốt thời gian qua.
              </p>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🎉 Không khí sự kiện
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sự kiện diễn ra trong không khí ấm cúng, thân mật với sự tham
                gia của hơn 100 đối tác và khách hàng thân thiết. Đây là cơ hội
                tuyệt vời để mọi người gặp gỡ, giao lưu và chia sẻ kinh nghiệm
                kinh doanh.
              </p>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/e10.jpg"
                  alt="Không khí sự kiện"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                📊 Thành tích năm 2025
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  Trong năm 2025, CamBiz đã đạt được nhiều thành tích đáng tự
                  hào:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 text-center shadow-md">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      300+
                    </div>
                    <div className="text-gray-600">Khách hàng phục vụ</div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center shadow-md">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      700K+
                    </div>
                    <div className="text-gray-600">Đơn hàng gửi đi</div>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center shadow-md">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      250+
                    </div>
                    <div className="text-gray-600">Đánh giá 5 sao</div>
                  </div>
                </div>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/e6.jpg"
                  alt="Thành tích công ty"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🎤 Phát biểu của Ban lãnh đạo
              </h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 italic leading-relaxed">
                  "Chúng tôi xin gửi lời cảm ơn sâu sắc đến tất cả các đối tác
                  và khách hàng đã tin tưởng lựa chọn CamBiz. Sự thành công của
                  chúng tôi chính là sự thành công của quý vị. Năm 2026, chúng
                  tôi cam kết sẽ tiếp tục nâng cao chất lượng dịch vụ, mang đến
                  những giải pháp tốt nhất cho các đối tác."
                </p>
                <p className="text-right text-gray-600 mt-4 font-semibold">
                  - Ban Giám Đốc CamBiz
                </p>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/e12.jpg"
                  alt="Ban lãnh đạo phát biểu"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🤝 Hoạt động giao lưu
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sự kiện có nhiều hoạt động giao lưu thú vị, tạo cơ hội cho các
                đối tác kết nối, chia sẻ kinh nghiệm và tìm kiếm cơ hội hợp tác
                mới.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-100 rounded-lg overflow-hidden">
                  <Image
                    src="/e5.jpg"
                    alt="Giao lưu đối tác"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-100 rounded-lg overflow-hidden">
                  <Image
                    src="/e6.jpg"
                    alt="Networking"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🎁 Trao giải thưởng
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                CamBiz đã vinh danh và trao giải thưởng cho các đối tác xuất sắc
                nhất năm 2025. Đây là sự ghi nhận xứng đáng cho những nỗ lực và
                đóng góp của các đối tác trong việc xây dựng và phát triển
                CamBiz.
              </p>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/fde.jpg"
                  alt="Trao giải thưởng"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">
                  🏆 Các giải thưởng được trao:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">🥇</span>
                    <span>
                      <strong>Đối tác xuất sắc nhất:</strong> Dành cho đối tác
                      có doanh số cao nhất
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">🥈</span>
                    <span>
                      <strong>Đối tác phát triển nhanh nhất:</strong> Tăng
                      trưởng vượt bậc trong năm
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">🥉</span>
                    <span>
                      <strong>Đối tác đồng hành lâu dài:</strong> Gắn bó với
                      CamBiz từ những ngày đầu
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/e8.jpg"
                  alt="Nhận giải thưởng"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🍽️ Tiệc buffet và giải trí
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sự kiện còn có tiệc buffet phong phú với nhiều món ăn đặc sắc,
                cùng các tiết mục văn nghệ sôi động, tạo không khí vui tươi, gắn
                kết cho tất cả mọi người.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-100 rounded-lg overflow-hidden">
                  <Image
                    src="/e9.jpg"
                    alt="Tiệc buffet"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-100 rounded-lg overflow-hidden">
                  <Image
                    src="/e10.jpg"
                    alt="Giải trí"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                📸 Khoảnh khắc đáng nhớ
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Những khoảnh khắc đẹp đã được ghi lại, lưu giữ những kỷ niệm
                tuyệt vời của sự kiện.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/e11.jpg"
                    alt="Khoảnh khắc 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/e12.jpg"
                    alt="Khoảnh khắc 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/e13.jpg"
                    alt="Khoảnh khắc 3"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🚀 Kế hoạch năm 2026
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  CamBiz hướng đến những mục tiêu mới:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>
                      Mở rộng mạng lưới kho bãi, tăng công suất lưu trữ lên 50%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>
                      Nâng cấp hệ thống công nghệ, tự động hóa quy trình
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>
                      Phát triển thêm các dịch vụ giá trị gia tăng cho khách
                      hàng
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>
                      Đào tạo và phát triển đội ngũ nhân sự chuyên nghiệp hơn
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/sk1.png"
                  alt="Tương lai CamBiz"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                💙 Lời cảm ơn
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <p className="text-xl text-gray-700 leading-relaxed mb-4">
                  Một lần nữa, CamBiz xin chân thành cảm ơn tất cả các đối tác,
                  khách hàng đã tham dự sự kiện và đồng hành cùng chúng tôi.
                </p>
                <p className="text-lg text-gray-600">
                  Hẹn gặp lại quý vị trong các sự kiện sắp tới! 🎉
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/#contact"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Trở thành đối tác của CamBiz
                </Link>
              </div>
            </div>
          </div>

          {/* Share & Back */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t">
            <Link
              href="/blog"
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay lại Blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
