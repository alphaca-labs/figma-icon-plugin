import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const iconsDirPath = path.resolve(__dirname, "..", "packages", "icon", "icons");
const outputBaseDir = path.resolve(
  __dirname,
  "..",
  "packages",
  "icon",
  "src",
  "components"
);

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const toPascalCase = (str) => {
  return str.replace(/(^\w|-\w)/g, (match) =>
    match.replace("-", "").toUpperCase()
  );
};

const createComponent = (dirName, iconId, svgContent) => {
  const componentName = toPascalCase(iconId);

  svgContent = svgContent.replace(/stroke="black"/g, 'stroke="currentColor"');
  svgContent = svgContent.replace(/fill="none"/g, 'fill="currentColor"');

  const componentTemplate = `
import { ForwardedRef, forwardRef } from 'react';

const ${componentName} = forwardRef((props, ref) => (
  ${svgContent.replace("<svg", "<svg {...props} ref={ref}")}
));

export default ${componentName};
  `;

  const outputDir = path.join(outputBaseDir, dirName);
  ensureDirectoryExists(outputDir);

  fs.writeFileSync(
    path.join(outputDir, `${componentName}.jsx`),
    componentTemplate
  );

  return componentName;
};

const generateComponents = () => {
  const jsonFiles = fs
    .readdirSync(iconsDirPath)
    .filter((file) => file.endsWith(".json"));

  let indexContent = "";

  jsonFiles.forEach((file) => {
    const filePath = path.join(iconsDirPath, file);
    const icons = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const dirName = path.basename(file, path.extname(file));

    Object.entries(icons).forEach(([key, value]) => {
      const componentName = createComponent(dirName, key, value.svg);
      indexContent += `export { default as ${componentName} } from './${dirName}/${componentName}';\n`;
    });
  });

  const indexPath = path.join(outputBaseDir, "index.js");
  ensureDirectoryExists(path.dirname(indexPath));
  fs.writeFileSync(indexPath, indexContent);

  console.log("SVG 컴포넌트 및 인덱스 파일 생성 완료!");
};

generateComponents();