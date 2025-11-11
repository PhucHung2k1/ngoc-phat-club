import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "NgocPhatClub - Trang Nội Bộ",
  description: "Trang web nội bộ quản lý NgocPhatClub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 antialiased text-slate-800">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
