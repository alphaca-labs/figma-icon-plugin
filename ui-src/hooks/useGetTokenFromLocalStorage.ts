import { useEffect } from "react";

export default function useGetTokenFromLocalStorage() {
  useEffect(function getTokenFromLocalStorage() {
    parent.postMessage({ pluginMessage: { type: "getToken" } }, "*");
  }, []);
}
