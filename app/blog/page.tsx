"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

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

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative mt-20 py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/cb.jpg"
            alt="CamBiz Blog"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog CamBiz
          </h1>
          <p className="text-xl text-blue-100">
            Tin tức, cập nhật và thông tin hữu ích về dịch vụ Fulfillment
          </p>
        </div>
      </section>

      {/* Blog Posts List */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Bài Viết Mới Nhất
          </h2>

          <div className="space-y-8">
            {currentPosts.map((post, index) => (
              <Link
                key={`${post.slug}-${index}`}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-80 h-64 md:h-56 flex-shrink-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 left-4 ${post.categoryColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                    >
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm text-gray-500">
                          {post.date}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span
                          className={`text-xs font-semibold ${post.categoryColor.replace(
                            "bg-",
                            "text-"
                          )}`}
                        >
                          {post.category}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2 md:line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center text-blue-600 font-semibold text-sm">
                      Đọc thêm
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
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
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md"
                }`}
              >
                ← Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === number
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-blue-100 shadow-md"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md"
                }`}
              >
                Sau →
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
