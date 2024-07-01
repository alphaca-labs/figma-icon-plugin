import { PostMessageTemplate } from "../../shared/index";
import { PostMessageType } from "../../shared/message-type";
import { convertComponentToSvg } from "./convertComponentToSvg";
import { createSvgMap } from "./createSvgMap";
import { findComponentsInFrame } from "./findComponentInFrame";
import { findFrame } from "./findFrame";

export async function extractIcon(frameName: string) {
  const frame = findFrame(frameName);
  if (!frame) {
    figma.ui.postMessage({
      type: PostMessageType.Error,
      message: "프레임을 찾을 수 없습니다.",
    });
    return;
  }

  const components = findComponentsInFrame(frame);
  const svgs = await Promise.all(components.map(convertComponentToSvg));
  const svgByName = createSvgMap(svgs);

  const pluginMessage: PostMessageTemplate = {
    type: PostMessageType.ExtractIcon,
    payload: {
      svgByName,
    },
  };

  figma.ui.postMessage(pluginMessage);
}
