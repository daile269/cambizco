"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function RecruitmentPost() {
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
            <span className="text-gray-900">Tuyển dụng nhân sự</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Tuyển dụng
              </span>
              <span className="text-gray-500">15/12/2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              📢 TUYỂN DỤNG NHÂN SỰ (YÊU CẦU BIẾT TV – CAM)
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src="/recruitment.jpg"
              alt="Tuyển dụng nhân sự"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                CamBiz đang tìm kiếm những nhân sự tài năng, nhiệt huyết để gia
                nhập đội ngũ của chúng tôi tại Campuchia. Đây là cơ hội tuyệt
                vời để phát triển sự nghiệp trong môi trường làm việc năng động
                và chuyên nghiệp.
              </p>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🔹 Các vị trí tuyển dụng:
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    1. Nhân viên Sale (biết Tiếng Việt – Tiếng Campuchia)
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Tư vấn và chăm sóc khách hàng</li>
                    <li>Phát triển mối quan hệ với đối tác</li>
                    <li>Đạt và vượt chỉ tiêu doanh số</li>
                  </ul>
                </div>

                <div className="relative h-100 rounded-lg overflow-hidden my-6">
                  <Image
                    src="/vp1.jpg"
                    alt="Đội ngũ Sale"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    2. Nhân viên Kho (biết Tiếng Việt – Tiếng Campuchia)
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Quản lý hàng hóa nhập xuất kho</li>
                    <li>Kiểm tra chất lượng sản phẩm</li>
                    <li>Đóng gói và chuẩn bị hàng giao</li>
                  </ul>
                </div>

                <div className="relative h-100 rounded-lg overflow-hidden my-6">
                  <Image
                    src="/k2.jpg"
                    alt="Kho hàng"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">
                    3. Trợ lý (biết Tiếng Việt – Tiếng Campuchia)
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Hỗ trợ công việc hành chính</li>
                    <li>Phối hợp giữa các bộ phận</li>
                    <li>Xử lý văn bản và tài liệu</li>
                  </ul>
                </div>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/t2.jpg"
                  alt="Văn phòng làm việc"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                ✅ Yêu cầu chung:
              </h2>
              <div className="bg-yellow-50 rounded-lg p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>
                      <strong>Ngôn ngữ:</strong> Giao tiếp thành thạo Tiếng Việt
                      và Tiếng Campuchia
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>
                      <strong>Thái độ:</strong> Nhiệt tình, trung thực, có tinh
                      thần trách nhiệm cao
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>
                      <strong>Kỹ năng:</strong> Làm việc nhóm tốt, chịu được áp
                      lực công việc
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/sk1.png"
                  alt="Môi trường làm việc"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                ✅ Quyền lợi:
              </h2>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">💰</span>
                    <span>
                      <strong>Thu nhập hấp dẫn:</strong> Lương cạnh tranh +
                      thưởng theo hiệu suất (trao đổi khi phỏng vấn)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🏢</span>
                    <span>
                      <strong>Môi trường:</strong> Làm việc ổn định, chuyên
                      nghiệp, năng động
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">📈</span>
                    <span>
                      <strong>Phát triển:</strong> Cơ hội thăng tiến rõ ràng,
                      đào tạo bài bản
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🎉</span>
                    <span>
                      <strong>Phúc lợi:</strong> Tham gia các hoạt động team
                      building, sự kiện công ty
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/e2.jpg"
                  alt="Team building"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                📞 Liên hệ ứng tuyển:
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="text-sm opacity-90">Điện thoại:</p>
                      <p className="text-xl font-bold">☎️ 0966 337 503</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm opacity-90">Telegram:</p>
                      <p className="text-xl font-bold">💬 0966337503</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-400">
                  <p className="text-center text-lg">
                    Hãy gửi CV của bạn ngay hôm nay để không bỏ lỡ cơ hội!
                  </p>
                </div>
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
