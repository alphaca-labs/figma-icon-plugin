import { SvgItem } from "../../shared/index";

export async function convertComponentToSvg(
  component: ComponentNode
): Promise<SvgItem> {
  try {
    let svg = await component.exportAsync({ format: "SVG_STRING" });
    svg = svg.replace(/<path([^>]*?)\/>/g, (match, p1) => {
      if (p1.includes("fill=")) {
        return match;
      } else {
        return `<path${p1} fill="currentColor"/>`;
      }
    });
    console.log("svg is ", svg);

    return {
      id: component.name,
      svg,
    };
  } catch (e) {
    console.error(`Error converting component ${component.name} to SVG:`, e);
    throw e;
  }
}
