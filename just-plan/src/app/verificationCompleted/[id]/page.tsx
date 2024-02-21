"use client";
import { fetchComposed } from "@/lib/returnFetch";
import { useSearchParams } from "next/navigation";

export default function VerificationCompleted() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("emailToken");
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
    .catch((error) => {
      console.error("Error:", error);
    });
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      인증 성공
    </div>
  );
}
