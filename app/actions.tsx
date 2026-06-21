"use server";

// 내부 rsc 로 들어가는 최초 진입 점

export async function submitMessage(formData) {
  const message = String(formData.get("message") || "").trim();

  return {
    message: message || "empty message",
    handledAt: new Date().toISOString(),
  };
}
