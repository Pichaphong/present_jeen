import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Traditional Chinese Medicine × Integrated Care",
  description: "วิสัยทัศน์แพทย์แผนจีน การทำงานร่วมกับกายภาพบำบัดและเวชศาสตร์ฟื้นฟู โดย พจ. กมลทิพย์ เผ่าอำนาจฤทธิ์",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
