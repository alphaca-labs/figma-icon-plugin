import { useEffect } from "react";
import { PluginMessage } from "../../shared";

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

      if (type === "getToken") {
        setFigmaToken(payload?.figmaToken ?? "");
        setGithubToken(payload?.githubToken ?? "");
      }
    };
  }, []);
}
