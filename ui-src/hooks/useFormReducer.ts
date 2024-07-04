import { useReducer } from "react";

type FormState = {
  figmaToken: string;
  githubToken: string;
  extractRoute: string;
  fileName: string;
};

type FormActionType =
  | "SET_FIGMA_TOKEN"
  | "SET_GITHUB_TOKEN"
  | "SET_ROUTE"
  | "SET_FILE_NAME";

type FormAction = {
  type: FormActionType;
  payload: string;
};

const initialState: FormState = {
  figmaToken: "",
  githubToken: "",
  extractRoute: "",
  fileName: "",
};

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_FIGMA_TOKEN":
      return { ...state, figmaToken: action.payload };
    case "SET_GITHUB_TOKEN":
      return { ...state, githubToken: action.payload };
    case "SET_ROUTE":
      return { ...state, extractRoute: action.payload };
    case "SET_FILE_NAME":
      return { ...state, fileName: action.payload };
    default:
      return state;
  }
};

export default function () {
  return useReducer(formReducer, initialState);
}
