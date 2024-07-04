import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconBridges from "../bridges/iconBridges";
import Progress from "../components/Progress";
import Step from "../constants/step";
import useBindOnMessageHandler from "../hooks/useBindOnMessageHandler";
import useFormReducer from "../hooks/useFormReducer";
import useGetTokenFromLocalStorage from "../hooks/useGetTokenFromLocalStorage";
import IconExtractPageStyle from "../styles/IconExtractPage.style";

export default function IconExtract() {
  const navigate = useNavigate();

  const [frameName, setFrameName] = useState<string>("");
  const [formState, dispatch] = useFormReducer();
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(Step.Pending);

  useGetTokenFromLocalStorage();

  useBindOnMessageHandler({
    setFigmaToken: (token: string) =>
      dispatch({ type: "SET_FIGMA_TOKEN", payload: token }),
    setGithubToken: (token: string) =>
      dispatch({ type: "SET_GITHUB_TOKEN", payload: token }),
  });

  const handleChangeFormState = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name === "figmaToken") {
      dispatch({ type: "SET_FIGMA_TOKEN", payload: value });
    } else if (name === "githubToken") {
      dispatch({ type: "SET_GITHUB_TOKEN", payload: value });
    } else if (name === "extractRoute") {
      dispatch({ type: "SET_ROUTE", payload: value });
    } else if (name === "fileName") {
      dispatch({ type: "SET_FILE_NAME", payload: value });
    }
  };

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setErrorMessage("");
      setStep(Step.Processing);
      iconBridges.extractIcon(frameName);
    },
    [frameName]
  );

  const handleClickCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleExtractError = useCallback((msg: string) => {
    setStep(Step.Pending);
    setErrorMessage(msg);
  }, []);

  return (
    <div id="iconExtract" style={IconExtractPageStyle.iconExtract}>
      <form
        id="iconExtractForm"
        onSubmit={handleSubmit}
        style={IconExtractPageStyle.iconExtractForm}
      >
        <h2 id="iconExtractTitle" style={IconExtractPageStyle.iconExtractTitle}>
          토큰 설정
        </h2>
        <div
          id="iconExtractFormInputBox"
          style={IconExtractPageStyle.iconExtractFormInputBox}
        >
          <div style={{ width: "100%" }}>
            <label htmlFor="frameName" style={IconExtractPageStyle.frameLabel}>
              추출할 프레임 이름
            </label>
            <input
              id="frameName"
              type="text"
              placeholder="아이콘이 담긴 프레임을 입력해주세요"
              value={frameName}
              onChange={(e) => setFrameName(e.target.value)}
              style={IconExtractPageStyle.frame}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label
              htmlFor="figmaToken"
              style={IconExtractPageStyle.figmaTokenLabel}
            >
              Figma personal access token
            </label>
            <input
              id="figmaToken"
              type="password"
              name="figmaToken"
              placeholder="피그마 홈에서 setting 탭에 있어요"
              value={formState.figmaToken}
              onChange={handleChangeFormState}
              style={IconExtractPageStyle.figmaToken}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label
              htmlFor="githubToken"
              style={IconExtractPageStyle.githubTokenLabel}
            >
              Github personal access token
            </label>
            <input
              id="githubToken"
              type="password"
              name="githubToken"
              placeholder="ghp_..."
              value={formState.githubToken}
              onChange={handleChangeFormState}
              style={IconExtractPageStyle.githubToken}
            />
          </div>

          <div style={{ width: "100%" }}>
            <label
              htmlFor="filename"
              style={IconExtractPageStyle.extractRouteLabel}
            >
              파일 이름
            </label>
            <input
              id="filename"
              name="filename"
              type="text"
              value={formState.fileName}
              onChange={handleChangeFormState}
              style={IconExtractPageStyle.extractRoute}
            />
          </div>

          <div style={{ width: "100%" }}>
            <label
              htmlFor="extractRoute"
              style={IconExtractPageStyle.extractRouteLabel}
            >
              추출할 경로 (루트 기준)
            </label>
            <input
              id="extractRoute"
              name="extractRoute"
              type="text"
              value={formState.extractRoute}
              onChange={handleChangeFormState}
              style={IconExtractPageStyle.extractRoute}
            />
          </div>
          {errorMessage ? (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errorMessage}
            </span>
          ) : (
            <span style={{ color: "black", fontSize: "14px" }}>
              토큰은 추출 성공 시 로컬 스토리지에 저장됩니다.
            </span>
          )}
        </div>

        {step === Step.Pending && (
          <div
            id="iconExtractStepButtonContainer"
            style={IconExtractPageStyle.iconExtractStepButtonContainer}
          >
            <button
              id="iconExtractFormSubmitButton"
              type="submit"
              style={IconExtractPageStyle.iconExtractFormSubmitButton}
            >
              아이콘 추출
            </button>
            <button
              id="iconExtractFormCancelButton"
              type="button"
              onClick={handleClickCancel}
              style={IconExtractPageStyle.iconExtractFormCancelButton}
            >
              선택 단계로
            </button>
          </div>
        )}

        {step === Step.Processing && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Progress
              figmaToken={formState.figmaToken}
              githubToken={formState.githubToken}
              extractRoute={formState.extractRoute}
              fileName={formState.fileName}
              onError={handleExtractError}
            />
          </div>
        )}
      </form>
    </div>
  );
}
