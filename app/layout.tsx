import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SN-고요의숲 대치 | 독학관리",
  description: "SN-고요의숲 대치 독학관리 공식 홈페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
