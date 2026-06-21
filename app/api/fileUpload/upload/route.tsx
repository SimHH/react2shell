// 파일 업로드 시 취약 파일 생성 라우터

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return Response.json({ error: "file is required" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");  // process.cwd(현재 플젝 홈) + public + uploads
  await mkdir(uploadDir, { recursive: true });

  const filename = file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);  // 파일 생성

  return Response.json({
    filename,
    size: buffer.length,
    url: `/uploads/${filename}`,
  });
}
