"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { database } from "@/lib/firebase";
import { ref, onValue, update, remove } from "firebase/database";
import { Consultation } from "@/types/consultation";
import { useAuth } from "@/contexts/AuthContext";

export default function ConsultationsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "contacted" | "completed"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const consultationsRef = ref(database, "consultations");

    const unsubscribe = onValue(consultationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const consultationsList: Consultation[] = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.createdAt - a.createdAt);
        setConsultations(consultationsList);
      } else {
        setConsultations([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: Consultation["status"]) => {
    try {
      const consultationRef = ref(database, `consultations/${id}`);
      await update(consultationRef, { status });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const deleteConsultation = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đăng ký này?")) return;

    try {
      const consultationRef = ref(database, `consultations/${id}`);
      await remove(consultationRef);
    } catch (error) {
      console.error("Error deleting consultation:", error);
      alert("Có lỗi xảy ra khi xóa đăng ký");
    }
  };

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      logout();
      router.push("/admin/login");
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("vi-VN");
  };

  const getStatusColor = (status: Consultation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Consultation["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "contacted":
        return "Đã liên hệ";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesFilter = filter === "all" || consultation.status === filter;
    const matchesSearch =
      consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: consultations.length,
    pending: consultations.filter((c) => c.status === "pending").length,
    contacted: consultations.filter((c) => c.status === "contacted").length,
    completed: consultations.filter((c) => c.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý đăng ký tư vấn
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin")}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors shadow-md"
            >
              ← Dashboard
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

        <p className="text-gray-600 mb-6">
          Quản lý và theo dõi các yêu cầu tư vấn từ khách hàng
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Tổng số</div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.total}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Chờ xử lý</div>
            <div className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Đã liên hệ</div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.contacted}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Hoàn thành</div>
            <div className="text-3xl font-bold text-green-600">
              {stats.completed}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Chờ xử lý
              </button>
              <button
                onClick={() => setFilter("contacted")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "contacted"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Đã liên hệ
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>

        {/* Consultations List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredConsultations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Không có đăng ký nào</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thông tin khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nội dung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredConsultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(consultation.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {consultation.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {consultation.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {consultation.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {consultation.message || (
                            <span className="text-gray-400 italic">
                              Không có nội dung
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={consultation.status}
                          onChange={(e) =>
                            updateStatus(
                              consultation.id!,
                              e.target.value as Consultation["status"]
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            consultation.status
                          )}`}
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="contacted">Đã liên hệ</option>
                          <option value="completed">Hoàn thành</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => deleteConsultation(consultation.id!)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Hiển thị {filteredConsultations.length} / {consultations.length} đăng
          ký
        </div>
      </div>
    </div>
  );
}
