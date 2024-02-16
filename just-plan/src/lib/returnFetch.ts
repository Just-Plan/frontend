"use client";
import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from "return-fetch";

const fetchExtended = returnFetch({
  baseUrl: "http://13.125.188.226:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  interceptors: {
    request: async (args) => {
      console.log("before sending request");

      return args;
    },

    response: async (response, requestArgs) => {
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

const basicHeaders = {
  "Content-Type": "application/json",
};

const accessToken = localStorage.getItem("access-token");

export const nextFetch = returnFetch({
  fetch: fetchExtended,
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
      console.log("11111url", url, "configs", configs);
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
      // configs!.headers = headers;
      console.log("222222url", url, "configs", configs);

      return [url, configs];
    },
    response: async (response, requestArgs) => {
      const res = await response.json();
      console.log("[return fetch] response 확인: ", response);
      console.log("[return fetch] response 확인(json): ", res.code);

      if (res.code === 4005) {
        // 1. 토큰 재발급
        const refreshTokenFetch = await fetch(
          `http://13.125.188.226:8080/api/user/reissue-token`,
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
