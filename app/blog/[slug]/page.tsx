"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { database } from "@/lib/firebase";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { BlogPost } from "@/types/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const postsRef = ref(database, "blogPosts");
    const postsQuery = query(postsRef, orderByChild("slug"), equalTo(slug));

    const unsubscribe = onValue(postsQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postKey = Object.keys(data)[0];
        const postData = {
          id: postKey,
          ...data[postKey],
        } as BlogPost;
        setPost(postData);
      } else {
        setPost(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug]);

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Tuyển dụng": "bg-orange-500",
      "Dịch vụ": "bg-blue-600",
      "Sự kiện": "bg-green-600",
    };
    return colors[category] || "bg-gray-600";
  };

  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Không tìm thấy bài viết
        </h1>
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white py-4 px-4 border-b mt-20">
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
            <span className="text-gray-900">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`${getCategoryColor(
                  post.category
                )} text-white px-4 py-1 rounded-full text-sm font-semibold`}
              >
                {post.category}
              </span>
              <span className="text-gray-500">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
          </div>

          {/* Featured Image */}
          {post.image1 && (
            <div className="relative h-120 rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={post.image1}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              {/* Description 1 */}
              {post.description1 && (
                <p className="text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                  {post.description1}
                </p>
              )}

              {/* Image 2 */}
              {post.image2 && (
                <div className="relative h-120 rounded-lg overflow-hidden my-8">
                  <Image
                    src={post.image2}
                    alt="Image 2"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Description 2 */}
              {post.description2 && (
                <p className="text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                  {post.description2}
                </p>
              )}

              {/* Image 3 */}
              {post.image3 && (
                <div className="relative h-120 rounded-lg overflow-hidden my-8">
                  <Image
                    src={post.image3}
                    alt="Image 3"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Description 3 */}
              {post.description3 && (
                <p className="text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                  {post.description3}
                </p>
              )}

              {/* Image 4 */}
              {post.image4 && (
                <div className="relative h-120 rounded-lg overflow-hidden my-8">
                  <Image
                    src={post.image4}
                    alt="Image 4"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {/* Description 4 */}
              {post.description4 && (
                <p className="text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                  {post.description4}
                </p>
              )}
            </div>
          </div>

          {/* Back Button */}
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
