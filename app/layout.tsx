import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDRH28WM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TYGX0HLBVH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TYGX0HLBVH');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MDRH28WM');
          `}
        </Script>
      </body>
    </html>
  );
}
