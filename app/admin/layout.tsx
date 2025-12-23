"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      {isLoginPage ? (
        // Don't protect the login page
        children
      ) : (
        // Protect all other admin pages
        <ProtectedRoute>{children}</ProtectedRoute>
      )}
    </AuthProvider>
  );
}
