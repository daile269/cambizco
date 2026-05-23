"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import FloatingContact from "@/components/FloatingContact";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { BlogPost } from "@/types/blog";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  // Fetch featured blog posts
  useEffect(() => {
    const postsRef = ref(database, "blogPosts");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const posts: BlogPost[] = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((post) => post.featured === true && post.published !== false) // Chỉ lấy bài viết nổi bật và đã được publish
          .sort((a, b) => b.createdAt - a.createdAt) // Sort by newest first
          .slice(0, 3); // Lấy tối đa 3 bài
        setFeaturedPosts(posts);
      }
    });

    return () => unsubscribe();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowThankYou(true);
        setFormData({ name: "", phone: "", email: "", message: "" });

        // Auto hide thank you page after 5 seconds
        setTimeout(() => {
          setShowThankYou(false);
        }, 5000);
      } else {
        alert(data.error || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const services = [
    {
      image: "https://via.placeholder.com/100/2563eb/ffffff?text=Sales",
      title: "Nhân viên Sale người bản địa Campuchia",
      description:
        "Đội ngũ telesale chuyên nghiệp, hiểu rõ thị trường địa phương",
    },
    {
      image: "https://via.placeholder.com/100/2563eb/ffffff?text=COD",
      title: "Giao hàng COD Campuchia",
      description: "Dịch vụ giao hàng thu tiền tận nơi nhanh chóng, an toàn",
    },
    {
      image: "https://via.placeholder.com/100/2563eb/ffffff?text=Warehouse",
      title: "Lưu kho ký gửi",
      description: "Kho bãi hiện đại, quản lý hàng hóa chuyên nghiệp",
    },
    {
      image: "https://via.placeholder.com/100/2563eb/ffffff?text=Shipping",
      title: "Vận chuyển Việt - Cam",
      description: "Vận chuyển xuyên biên giới nhanh chóng, uy tín",
    },
    {
      image: "https://via.placeholder.com/100/2563eb/ffffff?text=Money",
      title: "Thanh toán hộ và Thu hộ $",
      description: "Thanh toán hộ thu hộ an toàn, nhanh chóng, uy tín",
    },
    {
      image: "https://via.placeholder.com/100/2563eb/ffffff?text=Fulfillment",
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
    "Hỗ trợ test FREE để đo lường các chỉ số, dịch thuật FREE",
    "Hỗ trợ nhập hàng - lưu kho - đóng gói - vận chuyển đến tay khách hàng - đối soát COD",
    "Đội ngũ telesale; chat page người bản địa Campuchia tư vấn chốt đơn theo kịch bản chuyên nghiệp",
    "Hỗ trợ vận chuyển tiểu ngạch qua khẩu Campuchia",
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <ScrollAnimations />
      <FloatingContact />

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-4 animate-scale-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Thank You Message */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cảm ơn bạn!
              </h2>
              <p className="text-gray-600 mb-2">
                Chúng tôi đã nhận được thông tin đăng ký của bạn.
              </p>
              <p className="text-gray-600 mb-8">
                Đội ngũ CamBiz sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowThankYou(false)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Đóng
              </button>

              {/* Auto close message */}
              <p className="text-sm text-gray-400 mt-4">
                Tự động đóng sau 5 giây
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/cb.jpg"
            alt="CamBiz Fulfillment"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Overlay gradient for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 md:hidden"></div>

        <div className="absolute inset-0 opacity-20 hidden md:block">
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

        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg"
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

      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Mission */}
            <div className="space-y-6">
              <div className="mb-8">
                <Image
                  src="/logo.png"
                  alt="CamBiz Logo"
                  width={200}
                  height={80}
                  className="mb-4"
                />
                <p className="text-sm text-gray-600 italic">
                  CamBiz - Fullfillment Cam - Việt
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Sứ mệnh</h3>
                  </div>
                </div>

                <div className="pl-15 space-y-3 text-sm text-gray-700">
                  <p className="flex items-start">
                    <span className="text-blue-600 mr-2">+</span>
                    <span>
                      "Cánh tay" kết nối nhà bán hàng Việt tại Campuchia
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-600 mr-2">+</span>
                    <span>
                      "Chào cảnh" hỗ trợ nhà bán hàng Việt tiếp cận khách hàng
                      và đối tác tiềm năng, mở rộng hiệu trên thị trường
                      Campuchia
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Center Column - About & Values */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                  Về Chúng Tôi
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Là đơn vị hậu cần Fulfillment số 1 Việt – Cam chuyên nghiệp,
                  linh hoạt, khoa học, nhanh chóng, mang đến những giải pháp
                  Fulfillment tối ưu, giúp các tổ chức kinh doanh giảm thiểu chi
                  phí và rủi ro, dễ dàng gia nhập thị trường và quản lý hoạt
                  động thương mại điện tử của mình.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Giá trị cốt lõi
                </h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">
                      Thường yêu:
                    </p>
                    <p>
                      Chia sẻ, đùm bọc, cảm thông gần bó, biết ơn, xóm khách
                      hàng và đồng nghiệp như người nhà
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Tri tuệ:</p>
                    <p>
                      Thích học hỏi và tìm ra lý luật, làm trọn bổn phận, không
                      dùn dày, không đổ lỗi
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Tận tâm:</p>
                    <p>
                      Không ngừng học tập, đổi mới sáng tạo. Chia sẻ và đào tạo
                      cho đội ngũ tiếp cận
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">
                      Trung thực:
                    </p>
                    <p>
                      Sống tử tế, ngay thẳng, tôn trọng sự thật và các chuẩn mực
                      đạo đức tư hành động đến hành vi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-4 md:p-6 lg:p-8 relative overflow-hidden min-h-[350px] md:min-h-[450px] lg:min-h-[500px]">
                <div className="absolute top-4 left-4 bg-white px-3 md:px-4 py-2 rounded-lg shadow-md">
                  <p className="text-xs md:text-sm font-bold text-gray-900">
                    CAMBIZ
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-600">
                    Đơn vị hậu cần Fulfillment số 1
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-600">
                    Việt - Campuchia
                  </p>
                  <div className="mt-2 space-y-1 text-[10px] md:text-xs text-gray-700">
                    <p>📞 (+855) 0979 80 7979</p>
                    <p>📞 (+84) 0931 431 593 (Zalo)</p>
                  </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mt-20 md:mt-32">
                  <div className="col-span-2">
                    <div className="relative h-24 md:h-32 lg:h-48 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/t2.jpg"
                        alt="Team working"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="relative h-20 md:h-24 lg:h-32 rounded-full overflow-hidden shadow-lg border-2 md:border-4 border-white">
                    <Image
                      src="/warehouse.png"
                      alt="Office"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-20 md:h-24 lg:h-32 rounded-full overflow-hidden shadow-lg border-2 md:border-4 border-white">
                    <Image
                      src="/k1.jpg"
                      alt="Products"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-2 relative h-20 md:h-24 lg:h-32 rounded-full overflow-hidden shadow-lg border-2 md:border-4 border-white">
                    <Image
                      src="/don.jpg"
                      alt="Warehouse"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="relative py-12 px-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/warehouse.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Thống kê nổi bật</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">300+</div>
              <p className="text-sm text-gray-300">Khách hàng phục vụ</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">700000+</div>
              <p className="text-sm text-gray-300">Số đơn hàng gửi đi</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">250+</div>
              <p className="text-sm text-gray-300">Đánh giá 5*</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              DỊCH VỤ CỦA CHÚNG TÔI
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Là một trong những đơn vị tiên phong tại thị trường Đông Nam Á,
              CAMBIZ mang đến những giải pháp Fulfillment tối ưu giúp các tổ
              chức kinh doanh giảm thiểu chi phí và rủi ro, dễ dàng gia nhập thị
              trường và quản lý hoạt động thương mại điện tử của mình.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="/vp1.jpg"
                alt="Nhân viên Sale người bản địa Campuchia"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Nhân viên Sale người bản địa Campuchia
                </h3>
                <p className="text-sm text-gray-200">
                  Đội ngũ telesale chuyên nghiệp, hiểu rõ thị trường địa phương
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <Image
                    src="/cod.png"
                    alt="Nhân viên Sale người bản địa Campuchia"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="text-6xl font-bold mb-2">COD</div>
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11V9h4v2H8z" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Giao hàng COD Campuchia
                </h3>
                <p className="text-sm text-gray-200">
                  Gửi phí vận chuyển và giao hàng COD tận nhà cho khách hàng,
                  vừa tiện, vừng an toàn
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="/warehouse.png"
                alt="Lưu kho ký gửi"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Lưu kho ký gửi</h3>
                <p className="text-sm text-gray-200">
                  Hàng hóa sẽ được nhập kho, lưu trữ, theo dõi chính xác
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop"
                alt="Vận chuyển Việt - Cam"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Vận chuyển Việt - Cam
                </h3>
                <p className="text-sm text-gray-200">
                  Đưa hàng vận chuyển hàng hóa từ nhà cung cấp tại Việt Nam sang
                  Campuchia, tiết kiệm chi phí
                </p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop"
                alt="Chuyển tiền Cam- Việt"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Chuyển tiền Cam- Việt
                </h3>
                <p className="text-sm text-gray-200">
                  Thu COD và chuyển tiền từ Việt Nam sang Campuchia, miễn phí
                </p>
              </div>
            </div>

            {/* Service 6 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src="/delivery.png"
                alt="Fullfillment Vận Hành Mở"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Fullfillment Vận Hành Mở
                </h3>
                <p className="text-sm text-gray-200">
                  Giải pháp toàn diện từ A-Z cho doanh nghiệp, từ kho đến tay
                  khách hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              QUY TRÌNH VẬN HÀNH
            </h2>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            <div className="flex items-center justify-between relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="text-center mb-4 max-w-[180px]">
                  <p className="text-sm text-gray-700 leading-tight">
                    Nhà bán gửi hàng từ Việt Nam đến kho CamBiz tại Campuchia
                  </p>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative">
                    <Image
                      src="/s1.webp"
                      alt="Step 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex-1 flex items-center justify-center">
                <svg
                  className="w-16 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 64 32"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 16h52m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative">
                    <Image
                      src="/fde.jpg"
                      alt="Step 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="text-center mt-4 max-w-[180px]">
                  <p className="text-sm font-semibold text-gray-900">
                    Nhà bán chạy quảng cáo để được data của người mua
                  </p>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex-1 flex items-center justify-center">
                <svg
                  className="w-16 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 64 32"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 16h52m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="text-center mt-4 max-w-[180px] mb-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Đội Telesale, Chat Mess, tư vấn và gọi cho khách hàng tại
                    Campuchia
                  </p>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative">
                    <Image
                      src="/t2.jpg"
                      alt="Step 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
              </div>

              {/* Arrow 3 */}
              <div className="flex-1 flex items-center justify-center">
                <svg
                  className="w-16 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 64 32"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 16h52m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative">
                    <Image
                      src="/warehouse.png"
                      alt="Step 4"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <div className="text-center mt-4 max-w-[180px]">
                  <p className="text-sm font-semibold text-gray-900">
                    Kho xử lý, đóng gói và chuyển đơn tới giao hàng nội địa
                  </p>
                </div>
              </div>

              {/* Arrow 4 */}
              <div className="flex-1 flex items-center justify-center">
                <svg
                  className="w-16 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 64 32"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 16h52m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="text-center mb-4 max-w-[180px]">
                  <p className="text-sm text-gray-700 leading-tight">
                    CamBiz đối soát, chuyển tiền cho nhà bán hàng
                  </p>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative bg-blue-900 flex items-center justify-center">
                    <div className="text-white text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-xs font-bold">Success</p>
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {[
              {
                num: "1",
                title:
                  "Nhà bán gửi hàng từ Việt Nam đến kho CamBiz tại Campuchia ",
                subtitle: "Nhà bán chạy quảng cáo để được data của người mua",
                image:
                  "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop",
              },
              {
                num: "3",
                title:
                  "Đội Telesale, Chat Mess, tư vấn và gọi cho khách hàng tại Campuchia",
                subtitle:
                  "Kho xử lý, đóng gói và chuyển đơn tới giao hàng nội địa",
                image: "/team.png",
              },
              {
                num: "3",
                title: "",
                subtitle: "",
                icon: "👤",
              },
              {
                num: "4",
                title: "",
                subtitle:
                  "Kho xử lý, đóng gói và chuyển đơn tới giao hàng nội địa",
                image: "/warehouse.png",
              },
              {
                num: "5",
                title: "CamBiz đối soát, chuyển tiền cho nhà bán hàng",
                subtitle: "",
                success: true,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {step.title && (
                  <p className="text-sm text-gray-700 mb-4 max-w-xs">
                    {step.title}
                  </p>
                )}
                <div className="relative mb-4">
                  {step.image ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative">
                      <Image
                        src={step.image}
                        alt={`Step ${step.num}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : step.icon ? (
                    <div className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-4xl">{step.icon}</span>
                    </div>
                  ) : step.success ? (
                    <div className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg bg-blue-900 flex items-center justify-center">
                      <div className="text-white text-center">
                        <svg
                          className="w-12 h-12 mx-auto mb-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-xs font-bold">Success</p>
                      </div>
                    </div>
                  ) : null}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.num}
                  </div>
                </div>
                {step.subtitle && (
                  <p className="text-sm font-semibold text-gray-900 max-w-xs">
                    {step.subtitle}
                  </p>
                )}
                {index < 4 && (
                  <svg
                    className="w-8 h-16 text-blue-600 my-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="team" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              HOẠT ĐỘNG CÔNG TY
            </h2>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Row 1 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/sk2.png"
                alt="Team activity 1"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/sk1.png"
                alt="Team activity 2"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/t2.jpg"
                alt="Office team"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Row 2 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/sk3.png"
                alt="Meeting"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s4.png"
                alt="Team photo"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s5.png"
                alt="Event"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s6.png"
                alt="Company event"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/don.jpg"
                alt="Team building"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Row 3 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s8.png"
                alt="Office"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s11.png"
                alt="Warehouse"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s12.png"
                alt="Team meeting"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s13.png"
                alt="Workshop"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/s14.png"
                alt="Delivery"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Gallery Section */}
      <section className="px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              HÌNH ẢNH KHO
            </h2>
          </div>

          {/* Warehouse Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Row 1 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k1.jpg"
                alt="Warehouse 1"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k2.jpg"
                alt="Warehouse 2"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k5.jpg"
                alt="Main warehouse"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Row 2 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k4.jpg"
                alt="Storage area"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k3.png"
                alt="Inventory"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k6.jpg"
                alt="Packing area"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k7.jpg"
                alt="Shipping zone"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k3.png"
                alt="Loading dock"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Row 3 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k8.jpg"
                alt="Storage shelves"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k9.jpg"
                alt="Warehouse interior"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k10.jpg"
                alt="Logistics area"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k14.png"
                alt="Delivery trucks"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/k11.jpg"
                alt="Warehouse operations"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Gallery Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              SỰ KIỆN
            </h2>
          </div>

          {/* Events Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Row 1 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e1.jpg"
                alt="Company event 1"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e2.jpg"
                alt="Company event 2"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e3.png"
                alt="Team event"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Row 2 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e4.jpg"
                alt="Celebration"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e5.jpg"
                alt="Team building"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e6.jpg"
                alt="Workshop"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e7.jpg"
                alt="Conference"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e8.jpg"
                alt="Award ceremony"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Row 3 */}
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e9.jpg"
                alt="Training session"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e10.jpg"
                alt="Company party"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e11.jpg"
                alt="Networking event"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e12.jpg"
                alt="Team photo"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/e13.jpg"
                alt="Special event"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section id="blog" className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              BÀI VIẾT NỔI BẬT
            </h2>
            <p className="text-gray-600">
              Cập nhật tin tức và thông tin mới nhất từ CamBiz
            </p>
          </div>

          {/* Posts Slider */}
          {featuredPosts.length > 0 ? (
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
              className="featured-posts-swiper"
            >
              {featuredPosts.map((post) => (
                <SwiperSlide key={post.id}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block h-full"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image1 || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute top-4 left-4 ${getCategoryColor(
                          post.category
                        )} text-white px-4 py-1 rounded-full text-sm font-semibold`}
                      >
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.description1}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
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
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Đang tải bài viết...</p>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Xem tất cả bài viết
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="feedback" className="py-8 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              CAMBIZ lo dịch vụ Fulfillment từ A-Z Nhà bán chỉ
            </h2>
            <p className="text-xl md:text-2xl text-gray-700">
              cần chạy quảng cáo và chờ tiền về tài khoản
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left Column - Poster */}
            <div className="lg:col-span-3 space-y-4">
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/h0.png"
                  alt="CamBiz Poster"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">CAMBIZ</h3>
                <p className="text-sm mb-1">
                  CÔNG TY FULFILLMENT SỐ 1 TẠI CAMPUCHIA
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  <p>Giải pháp doanh nghiệp</p>
                  <p>Chuyên nghiệp - Uy tín</p>
                  <p>Nhanh chóng - Tiết kiệm</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="relative h-20 rounded overflow-hidden">
                    <Image
                      src="/k1.jpg"
                      alt="Service 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-20 rounded overflow-hidden">
                    <Image
                      src="/k2.jpg"
                      alt="Service 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-20 rounded overflow-hidden">
                    <Image
                      src="/k3.png"
                      alt="Service 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Success Screens */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Success Screen 1 */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/h111.jpg"
                  alt="Success Screen 1"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Success Screen 2 */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/camb.jpg"
                  alt="Success Screen 2"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Success Screen 3 */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/founderso.jpg"
                  alt="Success Screen 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/don.jpg"
                  alt="Success Screen 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/dg.jpg"
                  alt="Success Screen 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/k1.jpg"
                  alt="Success Screen 6"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column - Activity Photos Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l1.png"
                  alt="Activity 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l2.png"
                  alt="Activity 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l3.png"
                  alt="Activity 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l4.png"
                  alt="Activity 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l5.png"
                  alt="Activity 5"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l6.png"
                  alt="Activity 6"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/l7.png"
                  alt="Activity 7"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                <Image src="/l8.png" alt="Team" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-12 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
            >
              ĐĂNG KÝ NGAY
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ĐỐI TÁC CỦA CHÚNG TÔI
            </h2>
            <p className="text-gray-600 mb-4">
              Cá nhân, doanh nghiệp Marketer, Adser, Seller Việt Nam
              <br />
              bán hàng qua Campuchia
            </p>
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">CÓ CAMBIZ</p>
              <p className="text-xl font-bold text-orange-500">
                "NGỒI Ở VIỆT NAM" VẪN BÁN HÀNG TẠI CAMPUCHIA
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 shadow-2xl animate-slide-in-left">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                ĐĂNG KÝ TƯ VẤN
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Tên của bạn"
                    className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Địa chỉ Email"
                    className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Nội dung"
                    className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                </div>

                <div className="text-center text-white text-sm mb-4">
                  Bạn muốn chúng tôi liên hệ lại qua?
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? "Đang gửi..." : "Đăng ký miễn phí"}
                </button>
              </form>
            </div>

            {/* Right Column - Benefits */}
            <div className="flex flex-col justify-center animate-slide-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ĐĂNG KÝ NGAY
                <br />
                ĐỂ ĐƯỢC TƯ VẤN NHANH
              </h3>

              <p className="text-gray-700 mb-6">
                Nếu ở Việt Nam, vẫn kinh doanh được sang Campuchia, chọn ngay
                CamBiz!
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 text-xl flex-shrink-0">
                    👉
                  </span>
                  <p className="text-gray-700">
                    Hỗ trợ test FREE để đo lường các chỉ số, dịch thuật FREE
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 text-xl flex-shrink-0">
                    👉
                  </span>
                  <p className="text-gray-700">
                    Hỗ trợ nhập hàng - lưu kho - đóng gói - vận chuyển đến tay
                    khách hàng - đối soát COD
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 text-xl flex-shrink-0">
                    👉
                  </span>
                  <p className="text-gray-700">
                    Đội ngũ telesale; chat page người bản địa Campuchia tư vấn
                    chốt đơn theo kịch bản chuyên nghiệp
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 text-xl flex-shrink-0">
                    👉
                  </span>
                  <p className="text-gray-700">
                    Hỗ trợ vận chuyển tiểu ngạch qua khẩu Campuchia
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Hoặc liên hệ nhanh qua:</p>
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <a
                    href="https://www.facebook.com/LeHung2110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Hùng Lê</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .featured-posts-swiper {
          padding-bottom: 50px !important;
        }

        .featured-posts-swiper .swiper-button-next,
        .featured-posts-swiper .swiper-button-prev {
          color: #2563eb;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .featured-posts-swiper .swiper-button-next:after,
        .featured-posts-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .featured-posts-swiper .swiper-button-next:hover,
        .featured-posts-swiper .swiper-button-prev:hover {
          background: #2563eb;
          color: white;
        }

        .featured-posts-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
        }

        .featured-posts-swiper .swiper-pagination-bullet-active {
          background: #2563eb;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </main>
  );
}
