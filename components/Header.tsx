"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/cbz.png"
                alt="CamBiz Logo"
                width={130}
                height={130}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Dịch Vụ
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Quy trình
            </button>
            <button
              onClick={() => scrollToSection("feedback")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Feedback
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Đội ngũ
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Bài viết
            </button>
            <button
              onClick={() => scrollToSection("recruitment")}
              className={`font-medium hover:text-blue-600 transition-colors text-gray-700 cursor-pointer`}
            >
              Tuyển dụng
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Liên hệ tư vấn
            </button>
          </nav>

          {/* Mobile Menu Button - Right */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${
              isScrolled ? "text-gray-900" : "text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-slide-up">
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Dịch Vụ
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Quy trình
            </button>
            <button
              onClick={() => scrollToSection("feedback")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Feedback
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Giới thiệu
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Đội ngũ
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Bài viết
            </button>
            <button
              onClick={() => scrollToSection("recruitment")}
              className="block w-full text-left py-2 px-4 bg-white rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Tuyển dụng
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Liên hệ tư vấn
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
