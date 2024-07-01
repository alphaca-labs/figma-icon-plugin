import { SvgByName, SvgItem } from "../../shared/index";

export function createSvgMap(svgs: SvgItem[]): SvgByName {
  return svgs.reduce((acc, cur) => {
    if (cur && cur.id) {
      acc[cur.id] = cur;
    }
    return acc;
  }, {} as SvgByName);
}
