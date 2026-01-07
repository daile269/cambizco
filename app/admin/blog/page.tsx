"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { database } from "@/lib/firebase";
import { ref, remove, onValue } from "firebase/database";
import { BlogPost } from "@/types/blog";
import { useAuth } from "@/contexts/AuthContext";

const POSTS_PER_PAGE = 10;

export default function AdminBlogPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Search filters
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  // Fetch all posts
  useEffect(() => {
    const postsRef = ref(database, "blogPosts");
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })) as BlogPost[];
        // Sort by createdAt descending (newest first)
        postsArray.sort((a, b) => {
          const timeA = a.createdAt || 0;
          const timeB = b.createdAt || 0;
          return timeB - timeA;
        });
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Reset to page 1 when search filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTitle, searchDateFrom, searchDateTo]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
      try {
        const postRef = ref(database, `blogPosts/${id}`);
        await remove(postRef);
        alert("Xóa bài viết thành công!");
      } catch (error) {
        console.error("Error:", error);
        alert("Có lỗi xảy ra!");
      }
    }
  };

  // Filter posts based on search criteria
  const filteredPosts = posts.filter((post) => {
    // Filter by title
    const matchesTitle = searchTitle
      ? post.title.toLowerCase().includes(searchTitle.toLowerCase())
      : true;

    // Filter by date range
    let matchesDate = true;
    if (searchDateFrom || searchDateTo) {
      const postDate = post.createdAt;

      if (searchDateFrom) {
        const fromDate = new Date(searchDateFrom).getTime();
        matchesDate = matchesDate && postDate >= fromDate;
      }

      if (searchDateTo) {
        const toDate = new Date(searchDateTo).setHours(23, 59, 59, 999);
        matchesDate = matchesDate && postDate <= toDate;
      }
    }

    return matchesTitle && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTitle("");
    setSearchDateFrom("");
    setSearchDateTo("");
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      logout();
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Quản Lý Bài Viết Blog
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin")}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors shadow-md"
            >
              ← Dashboard
            </button>
            <button
              onClick={() => router.push("/admin/blog/new")}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              + Thêm Bài Viết
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Đăng Xuất
            </button>
          </div>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Tìm Kiếm & Lọc
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search by Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm theo tiêu đề
              </label>
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={searchDateFrom}
                onChange={(e) => setSearchDateFrom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={searchDateTo}
                onChange={(e) => setSearchDateTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              {filteredPosts.length !== posts.length && (
                <span className="font-medium text-blue-600">
                  Tìm thấy {filteredPosts.length} / {posts.length} bài viết
                </span>
              )}
              {filteredPosts.length === posts.length && (
                <span>Hiển thị tất cả {posts.length} bài viết</span>
              )}
            </div>

            {(searchTitle || searchDateFrom || searchDateTo) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Danh Sách Bài Viết</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tổng số: {posts.length} bài viết
            </p>
          </div>

          {currentPosts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">Chưa có bài viết nào</p>
              <button
                onClick={() => router.push("/admin/blog/new")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tạo bài viết đầu tiên
              </button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {currentPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            #{startIndex + index + 1}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {post.description1}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Slug: {post.slug}</span>
                          {post.createdAt && (
                            <span>
                              Tạo:{" "}
                              {new Date(post.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Thumbnail */}
                      {post.image1 && (
                        <div className="flex-shrink-0">
                          <img
                            src={post.image1}
                            alt={post.title}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/blog/edit/${post.id}`)
                          }
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Trước
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Sau →
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Trang {currentPage} / {totalPages}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
