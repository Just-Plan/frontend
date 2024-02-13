"use client";
import returnFetch from "return-fetch";

const fetchExtended = returnFetch({
  baseUrl: "http://13.125.188.226:8080",
  headers: {
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
  interceptors: {
    request: async (args) => {
      console.log("second request interceptor args", args);

      return args;
    },

    response: async (response, requestArgs) => {
      console.log("second response interceptor requestArgs", requestArgs);

      return response;
    },
  },
});

const basicHeaders = {
  'Content-Type': 'application/json',
};

export const nextFetch = returnFetch({
  fetch: fetchExtended,
  headers: { 
    Accept: 'application/json',
    authorization: `Bearer ${localStorage.getItem("access-token")}` || "",
  },
  interceptors: {
    request: async (args) => {
      console.log("request interceptor args", args);

      return args;
    },
    response: async (response, requestArgs) => {
      console.log("response interceptor requestArgs", requestArgs);

      return response;
    },
  },
});