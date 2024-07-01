import { PostMessageType } from "../../shared/message-type";

export default {
  extractIcon(frameName: string) {
    parent.postMessage(
      { pluginMessage: { type: PostMessageType.ExtractIcon, frameName } },
      "*"
    );
  },
};
