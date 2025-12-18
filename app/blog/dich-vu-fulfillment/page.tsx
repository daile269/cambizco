"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function FulfillmentPost() {
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
            <span className="text-gray-900">Dịch vụ Fulfillment</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Dịch vụ
              </span>
              <span className="text-gray-500">10/12/2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Dịch Vụ Fulfillment Toàn Diện Tại Campuchia
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src="/cb.jpg"
              alt="Dịch vụ Fulfillment"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                CamBiz tự hào là đơn vị cung cấp dịch vụ Fulfillment hàng đầu
                tại Campuchia, giúp các doanh nghiệp Việt Nam dễ dàng mở rộng
                thị trường sang xứ sở chùa tháp mà không cần phải có mặt tại
                đây.
              </p>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🎯 Fulfillment là gì?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Fulfillment là quá trình xử lý đơn hàng từ A đến Z, bao gồm nhận
                hàng, lưu kho, đóng gói, giao hàng và đối soát thanh toán.
                CamBiz lo tất cả để bạn chỉ cần tập trung vào việc bán hàng và
                marketing.
              </p>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/cod.png"
                  alt="Kho hàng hiện đại"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                📦 Quy trình Fulfillment của CamBiz
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      1
                    </span>
                    Nhập hàng & Lưu kho
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Chúng tôi nhận hàng từ Việt Nam, kiểm tra chất lượng và lưu
                    trữ trong kho bãi hiện đại, an toàn tại Campuchia.
                  </p>
                </div>

                <div className="relative h-100 rounded-lg overflow-hidden my-6">
                  <Image
                    src="/warehouse.png"
                    alt="Nhập hàng vào kho"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center">
                    <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      2
                    </span>
                    Quản lý đơn hàng
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Hệ thống quản lý đơn hàng tự động, cập nhật real-time, giúp
                    bạn theo dõi mọi đơn hàng dễ dàng.
                  </p>
                </div>

                <div className="relative h-100 rounded-lg overflow-hidden my-6">
                  <Image
                    src="/h1.png"
                    alt="Quản lý đơn hàng"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      3
                    </span>
                    Đóng gói chuyên nghiệp
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Đội ngũ nhân viên kho có kinh nghiệm đóng gói cẩn thận, đảm
                    bảo hàng hóa nguyên vẹn khi đến tay khách hàng.
                  </p>
                </div>

                <div className="relative h-100 rounded-lg overflow-hidden my-6">
                  <Image
                    src="/k7.jpg"
                    alt="Đóng gói hàng hóa"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center">
                    <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      4
                    </span>
                    Giao hàng COD
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Dịch vụ giao hàng thu tiền tận nơi (COD) nhanh chóng trên
                    toàn Campuchia, đảm bảo tỷ lệ giao hàng thành công cao.
                  </p>
                </div>

                <div className="relative h-100 rounded-lg overflow-hidden my-6">
                  <Image
                    src="/cod.png"
                    alt="Giao hàng COD"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-900 mb-3 flex items-center">
                    <span className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      5
                    </span>
                    Đối soát & Chuyển tiền
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Đối soát COD minh bạch, chuyển tiền về Việt Nam nhanh chóng,
                    an toàn với phí thấp.
                  </p>
                </div>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/h2.png"
                  alt="Đối soát thanh toán"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                ✨ Lợi ích khi sử dụng dịch vụ CamBiz
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🏠</span>
                    <div>
                      <strong className="text-blue-900">
                        Ngồi ở Việt Nam vẫn bán hàng Campuchia:
                      </strong>
                      <p>
                        Không cần đến tận nơi, chúng tôi lo tất cả từ A đến Z
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">💰</span>
                    <div>
                      <strong className="text-blue-900">
                        Tiết kiệm chi phí:
                      </strong>
                      <p>
                        Không cần thuê kho, thuê nhân viên, chỉ trả phí dịch vụ
                        theo đơn hàng
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                      <strong className="text-blue-900">Nhanh chóng:</strong>
                      <p>
                        Giao hàng trong 1-3 ngày, tỷ lệ thành công cao nhờ đội
                        ngũ bản địa
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <strong className="text-blue-900">
                        Tập trung bán hàng:
                      </strong>
                      <p>
                        Bạn chỉ cần chạy quảng cáo, chốt đơn, còn lại CamBiz lo
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="relative h-64 rounded-lg overflow-hidden my-8">
                <Image
                  src="/sk1.png"
                  alt="Đội ngũ CamBiz"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                🎁 Ưu đãi đặc biệt
              </h2>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4">
                    Đăng ký ngay hôm nay để nhận:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>
                        Hỗ trợ test FREE để đo lường các chỉ số, dịch thuật FREE
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>
                        Tư vấn chiến lược bán hàng tại thị trường Campuchia
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>
                        Miễn phí lưu kho 30 ngày đầu tiên (cho khách hàng mới)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative h-100 rounded-lg overflow-hidden my-8">
                <Image
                  src="/t2.jpg"
                  alt="Văn phòng CamBiz"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">
                📞 Liên hệ tư vấn
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
                <p className="text-xl mb-6 text-center">
                  Để được tư vấn chi tiết về dịch vụ Fulfillment, vui lòng liên
                  hệ:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">Hotline:</p>
                    <p className="text-2xl font-bold">☎️ 0966 337 503</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">Telegram:</p>
                    <p className="text-2xl font-bold">💬 0966337503</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/#contact"
                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Đăng ký tư vấn miễn phí
                  </Link>
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
