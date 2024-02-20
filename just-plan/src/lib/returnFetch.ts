"use client";
import returnFetch from "return-fetch";

const fetchExtended = returnFetch({
  // baseUrl: "http://13.125.188.226:8080",
  baseUrl: "https://justplan.site",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  interceptors: {
    request: async (args) => {
      console.log("before sending request");

      return args;
    },

    response: async (response) => {
      console.log("after receiving response");

      return response;
    },
  },
});
export const fetchComposed = returnFetch({
  fetch: fetchExtended,
  headers: {
    "Content-Type": "application/json",
    // authorization: `Bearer ${accessToken || ""}`,
  },
  interceptors: {
    request: async (args) => {
      console.log("second request interceptor args", args);

      return args;
    },

    response: async (response, requestArgs) => {
      console.log("second response interceptor requestArgs", requestArgs);
      console.log(response);

      return response;
    },
  },
});

let accessToken: string | null;
if (typeof window !== "undefined") {
  // 클라이언트 사이드에서만 실행
  accessToken = localStorage.getItem("access-token");
}

const fetcher = returnFetch({
  // baseUrl: "http://13.125.188.226:8080",
  baseUrl: "https://justplan.site",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  interceptors: {
    request: async ([url, configs]) => {
      let headers: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (accessToken) {
        headers = {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      if (!configs) {
        configs = {
          headers,
        };
      } else {
        configs.headers = headers;
      }

      return [url, configs];
    },
    response: async (response, requestArgs) => {
      const res = await response.json();
      if (res.code === 4005) {
        // 1. 토큰 재발급
        const refreshTokenFetch = await fetch(
          `https://justplan.site/api/user/reissue-token`,
          {
            credentials: "include",
          },
        );
        const refreshData = await refreshTokenFetch.json();
        console.log("data 확인", refreshData);

        // 2. 로컬 스토리지에 다시 저장
        localStorage.setItem("refreshToken", refreshData.data.refreshToken);

        // 3. 해당 요청 다시 보내기
        return fetch(...requestArgs);
      }
      return res.data;
    },
  },
});

// Parameters여기에 함수를 넣으면 인자를 준다
export const nextFetch = <T>(
  ...params: Parameters<ReturnType<typeof returnFetch>>
) => fetcher(...params) as Promise<T>;
