const config = {
  repository: {
    name: "front-boilerplate",
    iconExtractPath: "packages/icons",
    baseBranchName: "main",
    owner: "alphaca-labs",
  },
  commit: {
    message: "feat(icons): update icons",
    author: {
      name: "alphaca-labs",
      email: "mj.dev@alphaca.kr",
    },
  },
  pr: {
    title: "feat(icons): update icons",
    body: "피그마 기반으로 아이콘을 업데이트 합니다.",
    labels: ["feat:icon"],
  },
};

export default config;
