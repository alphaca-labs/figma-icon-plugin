import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostMessageType } from "../../shared/message-type";
import tokenBridges from "../bridges/tokenBridges";
import { useCreatePRWithSvgMap } from "../hooks/useCreatePRWithSvgMap";
import { useProgress } from "../hooks/useProgress";

interface ProgressProps {
  figmaToken: string;
  githubToken: string;
  extractRoute: string;
  onError: (msg: string) => void;
}

export default function Progress({
  figmaToken,
  githubToken,
  extractRoute,
  onError,
}: ProgressProps) {
  const navigate = useNavigate();

  const { progress, progressTitle, progressValue } = useProgress();

  const createPr = useCreatePRWithSvgMap({
    progress,
    githubToken,
    extractRoute,
  });
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const message = event.data.pluginMessage;

      if (message.type === PostMessageType.Error) {
        onError("프레임을 찾을 수 없습니다.");
        return;
      }

      if (message.type === PostMessageType.ExtractIcon) {
        const { svgByName } = message.payload;
        const prUrl = await createPr(svgByName);
        tokenBridges.saveToken(figmaToken, githubToken);
        navigate("../extract_success", { state: { url: prUrl } });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          height: "4px",
        }}
      >
        <div
          style={{
            width: `${progressValue * 100}%`,
            backgroundColor: "#0070f3",
            height: "4px",
          }}
        />
      </div>
      <span>{progressTitle}</span>
    </div>
  );
}
