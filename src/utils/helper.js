import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator()

export const createElement = (id,x1,y1,x2, y2,type)=>{
    var roughElement = generator.line(x1,y1,x2,y2)
    if(type === "rectangle"){
        roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1)
    }
    if(type === "circle"){
        var diameter = 2 * Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1))
        roughElement = generator.circle(x1,y1,diameter)
    }
    return {id,x1,y1,x2,y2,type,roughElement}
}

const distance = (a,b) => Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2))

const isWithInElement = (x,y,element) => {
    const {type,x1,x2,y1,y2} = element
    if(type === 'rectangle'){
        const minX = Math.min(x1,x2)
        const maxX = Math.max(x1,x2)
        const minY = Math.min(y1,y2)
        const maxY = Math.max(y1,y2)
        return x>=minX && x<=maxX && y>=minY && y<=maxY
    }else if(type === 'line') {
        const a = {x: x1,y: y1}
        const b = {x: x2,y: y2}
        const c = {x,y}
        const offset = distance(a,b) - (distance(a,c) + distance(b,c))
        return Math.abs(offset)<1
    }else{
        //circle
        // x1,y1 = center
        // radius = distance between x1,y1 and x2,y2
        const a = {x,y}// point
        const b = {x: x1,y: y1}// center coordinates
        const c = {x: x2,y: y2}// periphery point
        const radius = distance(b,c)
        return distance(a,b) <= radius
    }
}

export const getElementAtPosition = (x,y,elements)=> {
    return elements.find(element => isWithInElement(x,y,element))
}


export const updateElement = (id,x1,y1,x2,y2,type,elements,setElements)=> {
    const updatedElement = createElement(id,x1,y1,x2,y2,type);
    var elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
}