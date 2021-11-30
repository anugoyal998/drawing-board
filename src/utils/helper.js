import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator()

export const createElement = (x1,y1,x2, y2,tool)=>{
    var roughElement = generator.line(x1,y1,x2,y2)
    if(tool === "rectangle"){
        roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1)
    }
    if(tool === "circle"){
        var diameter = 2 * Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1))
        roughElement = generator.circle(x1,y1,diameter)
    }
    return {x1,y1,x2,y2,roughElement}
}