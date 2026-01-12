"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { database } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";
import { BlogPostInput } from "@/types/blog";
import { CldUploadWidget } from "next-cloudinary";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPostInput>({
    category: "",
    title: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    slug: "",
  });
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        featured: featured,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const postsRef = ref(database, "blogPosts");
      await push(postsRef, postData);

      alert("Tạo bài viết mới thành công!");
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!");
      setIsSubmitting(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (result: any, imageField: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [imageField]: result.info.secure_url,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/blog")}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2"
          >
            ← Quay lại danh sách
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Tạo Bài Viết Mới</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh Mục <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Ví dụ: Tuyển dụng, Dịch vụ, Sự kiện..."
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu Đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    title: newTitle,
                    slug: isSlugManual ? prev.slug : createSlug(newTitle),
                  }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (Đường dẫn thân thiện){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => {
                  setIsSlugManual(true);
                  setFormData({ ...formData, slug: e.target.value });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
                placeholder="slug-bai-viet"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tự động tạo từ tiêu đề nếu không nhập tay.
              </p>
            </div>

            {/* Description 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô Tả 1 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description1}
                onChange={(e) =>
                  setFormData({ ...formData, description1: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Nhập mô tả đầu tiên"
              />
            </div>

            {/* Description 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô Tả 2
              </label>
              <textarea
                value={formData.description2}
                onChange={(e) =>
                  setFormData({ ...formData, description2: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mô tả thứ hai (tùy chọn)"
              />
            </div>

            {/* Description 3 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô Tả 3
              </label>
              <textarea
                value={formData.description3}
                onChange={(e) =>
                  setFormData({ ...formData, description3: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mô tả thứ ba (tùy chọn)"
              />
            </div>

            {/* Description 4 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô Tả 4
              </label>
              <textarea
                value={formData.description4}
                onChange={(e) =>
                  setFormData({ ...formData, description4: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mô tả thứ tư (tùy chọn)"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="border-t pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Đánh dấu là bài viết nổi bật
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Bài viết nổi bật sẽ hiển thị trên trang chủ (tối đa 3 bài
                    mới nhất)
                  </p>
                </div>
              </label>
            </div>

            {/* Images Upload */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Hình Ảnh</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ảnh {num}
                    </label>
                    <CldUploadWidget
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onSuccess={(result) =>
                        handleImageUpload(result, `image${num}`)
                      }
                    >
                      {({ open }) => (
                        <div>
                          <button
                            type="button"
                            onClick={() => open()}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {formData[`image${num}` as keyof BlogPostInput]
                              ? `Thay đổi ảnh ${num}`
                              : `Upload ảnh ${num}`}
                          </button>
                          {formData[`image${num}` as keyof BlogPostInput] && (
                            <div className="mt-2 relative">
                              <img
                                src={
                                  formData[`image${num}` as keyof BlogPostInput]
                                }
                                alt={`Preview ${num}`}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    [`image${num}`]: "",
                                  })
                                }
                                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                              >
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </CldUploadWidget>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Đang tạo..." : "Tạo Bài Viết"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/blog")}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
