import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator()

export const createElement = (x1,y1,x2, y2)=>{
    const roughElement = generator.line(x1,y1,x2,y2)
    return {x1,y1,x2,y2,roughElement}
}