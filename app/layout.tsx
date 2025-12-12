import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CamBiz - Đơn vị Fulfillment số 1 Việt - Cam",
  description:
    "Nhanh chóng - Uy tín. Chuyên nghiệp, linh hoạt, khoa học, nhanh chóng - Mang đến những giải pháp Fulfillment tối ưu cho doanh nghiệp.",
  keywords:
    "fulfillment, cambiz, campuchia, vietnam, logistics, warehouse, cod, delivery",
  openGraph: {
    title: "CamBiz - Đơn vị Fulfillment số 1 Việt - Cam",
    description: "Nhanh chóng - Uy tín",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
