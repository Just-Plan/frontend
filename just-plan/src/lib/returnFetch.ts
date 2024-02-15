"use client";
import returnFetch from "return-fetch";

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
const accessToken = localStorage.getItem("access-token") || "";

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
  'Content-Type': 'application/json',
};

const accessToken = localStorage.getItem("access-token");

export const nextFetch = returnFetch({
  fetch: fetchExtended,
  headers: { 
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${accessToken}` || "",
  },
  interceptors: {
    request: async (args) => {
      console.log("request interceptor args", args);
      return args;
    },
    response: async (response, requestArgs) => {
      return response;
    },
  },
});