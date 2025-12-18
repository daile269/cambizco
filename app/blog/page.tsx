"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "tuyen-dung-nhan-su",
      title: "📢 TUYỂN DỤNG NHÂN SỰ (YÊU CẦU BIẾT TV – CAM)",
      excerpt:
        "Chúng tôi cần tuyển các vị trí: Nhân viên Sale, Nhân viên Kho, Trợ lý. Yêu cầu giao tiếp được Tiếng Việt & Tiếng Campuchia",
      image: "/recruitment.jpg",
      category: "Tuyển dụng",
      categoryColor: "bg-orange-500",
      date: "15/12/2025",
    },
    {
      slug: "dich-vu-fulfillment",
      title: "Dịch Vụ Fulfillment Toàn Diện Tại Campuchia",
      excerpt:
        "CamBiz cung cấp giải pháp fulfillment từ A-Z, giúp bạn dễ dàng kinh doanh từ Việt Nam sang Campuchia",
      image: "/cb.jpg",
      category: "Dịch vụ",
      categoryColor: "bg-blue-600",
      date: "10/12/2025",
    },
    {
      slug: "su-kien-cong-ty",
      title: "Sự Kiện Gặp Mặt Đối Tác Cuối Năm",
      excerpt:
        "CamBiz tổ chức sự kiện gặp mặt đối tác, tri ân khách hàng đã đồng hành cùng chúng tôi trong suốt thời gian qua",
      image: "/e12.jpg",
      category: "Sự kiện",
      categoryColor: "bg-green-600",
      date: "05/12/2025",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 mt-20 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog CamBiz
          </h1>
          <p className="text-xl text-blue-100">
            Tin tức, cập nhật và thông tin hữu ích về dịch vụ Fulfillment
          </p>
        </div>
      </section>

      {/* Blog Posts Slider */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="blog-swiper"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 left-4 ${post.categoryColor} text-white px-4 py-1 rounded-full text-sm font-semibold`}
                    >
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {post.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      Xem chi tiết
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
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
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .blog-swiper {
          padding-bottom: 50px !important;
        }

        .blog-swiper .swiper-button-next,
        .blog-swiper .swiper-button-prev {
          color: #2563eb;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .blog-swiper .swiper-button-next:after,
        .blog-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .blog-swiper .swiper-button-next:hover,
        .blog-swiper .swiper-button-prev:hover {
          background: #2563eb;
          color: white;
        }

        .blog-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
        }

        .blog-swiper .swiper-pagination-bullet-active {
          background: #2563eb;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </main>
  );
}
