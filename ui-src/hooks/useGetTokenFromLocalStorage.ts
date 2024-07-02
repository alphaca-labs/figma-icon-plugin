import { useEffect } from "react";
import { PostMessageType } from "../../shared/message-type";

export default function useGetTokenFromLocalStorage() {
  useEffect(function getTokenFromLocalStorage() {
    parent.postMessage(
      { pluginMessage: { type: PostMessageType.GetToken } },
      "*"
    );
  }, []);
}
