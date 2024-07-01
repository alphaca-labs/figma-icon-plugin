export function findFrame(frameName: string): FrameNode | null {
  const frames = figma.currentPage.findAll(
    (node) => node.type === "FRAME" && node.name === frameName
  ) as FrameNode[];
  return frames.length > 0 ? frames[0] : null;
}
