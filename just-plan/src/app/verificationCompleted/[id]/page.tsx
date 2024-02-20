"use client";
import { fetchComposed } from "@/lib/returnFetch";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerificationCompleted() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("emailToken");
  const [text, setText] = useState("");
  fetchComposed(`/api/email-auth/verify?emailToken=${searchTerm}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.code === 2000) {
        setText("인증 성공");
      } else {
        setText("인증 실패 다시 시도해주세요");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      인증 성공
    </div>
  );
}
