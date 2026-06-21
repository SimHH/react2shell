import MessageForm from "./message-form";

export default function Page() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Next.js App Router</p>
        <h1>React2Shell RSC</h1>
        <p>
          Next.js 프레임워크 CVE-2025-66478 및 기타 취약점 실습 페이지입니다.<br /><br />
          1. npm run build<br />
          2. node --inspect-brk=127.0.0.1:9229 ./node_modules/next/dist/bin/next start 서버 실행<br />
          3. chrome://inspect 에서 동적 디버깅
        </p>
      </section>

      <MessageForm />

      <section className="notes">
        <h2>current versions</h2>
        <ul>
          <li>next@15.5.6</li>
          <li>react@19.2.0</li>
          <li>react-dom@19.2.0</li>
        </ul>
      </section>
      <section className="notes">
        <h2>Additional Vulnerability</h2>
        <p>
          <a href="/vulnerability/fileUpload">1. file Upload Vulnerability</a>
        </p>
      </section>
    </main>
  );
}
