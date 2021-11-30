import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator();

export const createElement = (props) => {
  const { x1, y1, x2, y2, tool } = props;
  var roughElement = generator.line(x1, y1, x2, y2);
  if (tool === "rectangle") {
    roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  }
  return { x1, y1, x2, y2, roughElement };
};
