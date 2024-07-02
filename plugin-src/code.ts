import { PostMessageType } from "../shared/message-type";
import { extractIcon } from "./utils/extractIcon";

figma.showUI(__html__, {
  themeColors: true,
  width: 400,
  height: 600,
  visible: true,
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === PostMessageType.ExtractIcon) {
    await extractIcon(msg.frameName);
  }
  // figma.closePlugin();
};
