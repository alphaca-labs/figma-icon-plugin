import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExtractSuccessPageStyle from "../styles/ExtractSuccessPage.style";

export default function ExtractSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { url } = location.state as { url: string };

  const handleMouseEvent = useCallback(
    (color: string) =>
      (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        (
          e.currentTarget as HTMLAnchorElement | HTMLButtonElement
        ).style.backgroundColor = color;
      },
    []
  );

  const handleClickGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div id="extractSuccess" style={ExtractSuccessPageStyle.extractSuccess}>
      <span style={{ fontSize: "18px", fontWeight: "500" }}>
        아이콘 추출 성공!
      </span>
      <a
        id="extractSuccessPrLink"
        href={url}
        target="_blank"
        rel="noreferrer"
        style={ExtractSuccessPageStyle.extractSuccessPrLink}
        onMouseEnter={handleMouseEvent("#D1D1D6")}
        onMouseLeave={handleMouseEvent("#E9E9EB")}
      >
        PR 링크
      </a>
      <button
        id="extractSuccessGoHome"
        type="button"
        onClick={handleClickGoHome}
        style={ExtractSuccessPageStyle.extractSuccessGoHome}
        onMouseEnter={handleMouseEvent("#005BB5")}
        onMouseLeave={handleMouseEvent("#007AFF")}
      >
        선택 단계로
      </button>
    </div>
  );
}
