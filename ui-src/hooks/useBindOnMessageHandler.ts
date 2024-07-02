import { useEffect } from "react";
import { PluginMessage } from "../../shared";
import { PostMessageType } from "../../shared/message-type";

type BindOnMEssageHanderProps = {
  setFigmaToken: (token: string) => void;
  setGithubToken: (token: string) => void;
};

export default function useBindOnMessageHandler({
  setFigmaToken,
  setGithubToken,
}: BindOnMEssageHanderProps) {
  useEffect(function bindOnMessageHandler() {
    window.onmessage = async (event: MessageEvent<PluginMessage>) => {
      const { type, payload } = event.data.pluginMessage;

      if (type === PostMessageType.GetToken) {
        setFigmaToken(payload?.figmaToken ?? "");
        setGithubToken(payload?.githubToken ?? "");
      }
    };
  }, []);
}
