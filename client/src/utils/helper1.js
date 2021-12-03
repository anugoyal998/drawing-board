import getStroke from "perfect-freehand";

export const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
    case "resizeCircle":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
};

const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z");
  return d.join(" ");
};

export const drawElement = (roughCanvas, context, element) => {
  switch (element.type) {
    case "line":
    case "rectangle":
    case "circle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      const myStroke = getStroke(element.points, {
        size: 4,
      });
      const pathData = getSvgPathFromStroke(myStroke);
      const myPath = new Path2D(pathData);
      context.fill(myPath);
      break;
    case "text":
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`type not recognized: ${element.type}`);
  }
};
