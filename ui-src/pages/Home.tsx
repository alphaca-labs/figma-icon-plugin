import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HomePageStyle from "../styles/HomePage.style";

export default function Home() {
  const navigate = useNavigate();

  const handleClickExtract = useCallback(() => {
    navigate("extract");
  }, [navigate]);

  return (
    <div style={HomePageStyle.homeContainer}>
      <button type="button" onClick={handleClickExtract}>
        아이콘 추출
      </button>
    </div>
  );
}
