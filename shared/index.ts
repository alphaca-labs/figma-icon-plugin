import { PostMessageType } from "./message-type";

export interface PostMessageTemplate {
  type: PostMessageType;
  payload: any;
}

export type SvgByName = { [id: string]: object };

export interface GetTokenPluginMessage {
  type: "getToken";
  payload: {
    figmaToken?: string;
    githubToken?: string;
  };
}

export interface PluginMessage {
  pluginMessage: PostMessageTemplate | GetTokenPluginMessage;
}

export interface ExtractUIMessage {
  type: "extract";
}

export interface GetTokenUIMessage {
  type: "getToken";
}

export interface SetTokenUIMessage {
  type: "setToken";
  payload: string;
}

export type UIMessage =
  | ExtractUIMessage
  | GetTokenUIMessage
  | SetTokenUIMessage;

export type SvgItem = {
  id: string;
  svg: string;
};
