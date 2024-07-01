import { PostMessageType } from "../../shared/message-type";

export default {
  saveToken(figmaToken: string, githubToken: string) {
    parent.postMessage(
      {
        pluginMessage: {
          type: PostMessageType.SaveToken,
          payload: { figmaToken, githubToken },
        },
      },
      "*"
    );
  },
};
