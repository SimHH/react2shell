export const metadata = {
  title: "React2Shell Test",
  description: "Local Next.js RSC lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
