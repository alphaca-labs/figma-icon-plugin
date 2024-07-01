export function findComponentsInFrame(frame: FrameNode): ComponentNode[] {
  return frame.findAll((node) => node.type === "COMPONENT") as ComponentNode[];
}
