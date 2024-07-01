import { SvgItem } from "../../shared/index";

export async function convertComponentToSvg(
  component: ComponentNode
): Promise<SvgItem> {
  try {
    const svg = await component.exportAsync({ format: "SVG_STRING" });
    return {
      id: component.name,
      svg,
    };
  } catch (e) {
    console.error(`Error converting component ${component.name} to SVG:`, e);
    throw e;
  }
}
