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
  if (msg.type === PostMessageType.GetToken) {
    const token = await figma.clientStorage.getAsync("token");
    const pluginMessage = {
      type: PostMessageType.GetToken,
      payload: token,
    };
    figma.ui.postMessage(pluginMessage);
  }
  if (msg.type === PostMessageType.SaveToken) {
    await figma.clientStorage.setAsync("token", msg.payload);
  }
  // figma.closePlugin();
};
