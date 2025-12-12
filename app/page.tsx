"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const services = [
    {
      icon: "👥",
      title: "Nhân viên Sale người bản địa Campuchia",
      description:
        "Đội ngũ telesale chuyên nghiệp, hiểu rõ thị trường địa phương",
    },
    {
      icon: "📦",
      title: "Giao hàng COD Campuchia",
      description: "Dịch vụ giao hàng thu tiền tận nơi nhanh chóng, an toàn",
    },
    {
      icon: "🏭",
      title: "Lưu kho ký gửi",
      description: "Kho bãi hiện đại, quản lý hàng hóa chuyên nghiệp",
    },
    {
      icon: "🚚",
      title: "Vận chuyển Việt - Cam",
      description: "Vận chuyển xuyên biên giới nhanh chóng, uy tín",
    },
    {
      icon: "💰",
      title: "Chuyển tiền Cam- Việt",
      description: "Dịch vụ chuyển tiền an toàn, phí thấp",
    },
    {
      icon: "⚙️",
      title: "Fullfillment Vận Hành Mở",
      description: "Giải pháp toàn diện từ A-Z cho doanh nghiệp",
    },
  ];

  const stats = [
    { number: "300+", label: "Khách hàng phục vụ" },
    { number: "700,000+", label: "Số đơn hàng gửi đi" },
    { number: "250+", label: "Đánh giá 5*" },
  ];

  const benefits = [
    "👉 Hỗ trợ test FREE để đo lường các chỉ số, dịch thuật FREE",
    "👉 Hỗ trợ nhập hàng - lưu kho - đóng gói - vận chuyển đến tay khách hàng - đối soát COD",
    "👉 Đội ngũ telesale; chat page người bản địa Campuchia tư vấn chốt đơn theo kịch bản chuyên nghiệp",
    "👉 Hỗ trợ vận chuyển tiểu ngạch qua khẩu Campuchia",
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/cb.jpg"
            alt="CamBiz Fulfillment"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div
            className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Về Chúng Tôi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <p className="text-xl md:text-2xl leading-relaxed text-center">
              Là đơn vị hậu cần Fulfillment số 1 Việt – Cam chuyên nghiệp, linh
              hoạt, khoa học, nhanh chóng, mang đến những giải pháp Fulfillment
              tối ưu, giúp các tổ chức kinh doanh giảm thiểu chi phí và rủi ro,
              dễ dàng gia nhập thị trường và quản lý hoạt động thương mại điện
              tử của mình.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dịch Vụ Của Chúng Tôi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Là một trong những đơn vị tiên phong tại thị trường Đông Nam Á,
              CAMBIZ mang đến những giải pháp Fulfillment tối ưu giúp các tổ
              chức kinh doanh giảm thiểu chi phí và rủi ro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 group"
              >
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quy Trình Vận Hành
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Tiếp nhận đơn hàng",
                desc: "Nhận và xác nhận thông tin đơn hàng từ khách hàng",
              },
              {
                step: "02",
                title: "Nhập kho & Quản lý",
                desc: "Nhập hàng vào kho và quản lý tồn kho chuyên nghiệp",
              },
              {
                step: "03",
                title: "Đóng gói & Vận chuyển",
                desc: "Đóng gói cẩn thận và vận chuyển nhanh chóng",
              },
              {
                step: "04",
                title: "Giao hàng & COD",
                desc: "Giao hàng tận nơi và thu tiền COD an toàn",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 text-center">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-300">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="team"
        className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hoạt Động Công Ty
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
              <Image
                src="/warehouse.png"
                alt="Hình ảnh kho"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Hình Ảnh Kho</h3>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
              <Image
                src="/team.png"
                alt="Đội ngũ"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Đội Ngũ</h3>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
              <Image
                src="/delivery.png"
                alt="Sự kiện"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Vận Chuyển</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="feedback"
        className="py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            CAMBIZ lo dịch vụ Fulfillment từ A-Z
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Nhà bán chỉ cần chạy quảng cáo và chờ tiền về tài khoản
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-xl"
          >
            ĐĂNG KÝ NGAY
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Đăng Ký Tư Vấn
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 mb-8">
              Đăng ký ngay để được tư vấn nhanh
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl shadow-lg p-8">
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-2xl">{benefit.split(" ")[0]}</span>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {benefit.substring(benefit.indexOf(" ") + 1)}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Nhập họ và tên"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Nhập email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nội dung
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Nhập nội dung cần tư vấn..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
              >
                Gửi đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
