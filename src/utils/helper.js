import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator()

export const createElement = (id,x1,y1,x2, y2,type)=>{
    var roughElement
    switch(type) {
        case 'line':
            roughElement = generator.line(x1,y1,x2,y2)
            return {id,x1,y1,x2,y2,type,roughElement}
        case "rectangle":
            roughElement = generator.rectangle(x1,y1,x2-x1,y2-y1)
            return {id,x1,y1,x2,y2,type,roughElement}
        case "circle":
            var diameter = 2 * Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1))
            roughElement = generator.circle(x1,y1,diameter)
            return {id,x1,y1,x2,y2,type,roughElement}
        case "pencil":
            return {id,type,points: [{x: x1,y: y1}]}
        default:
            throw new Error(`type not recognized: ${type}`)
    }
}

const distance = (a,b) => Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2))

const nearPoint = (x,y,x1,y1,name) => {
    return Math.abs(x-x1)<5 && Math.abs(y-y1)<5 ? name : null
}

const onLine = (x1,y1,x2,y2,x,y,maxDistance=1) => {
    const a = {x: x1,y: y1}
    const b = {x: x2,y: y2}
    const c = {x,y}
    const offset = distance(a,b) - (distance(a,c) + distance(b,c))
    return Math.abs(offset)<maxDistance ? "inside" : null
}

const positionWithInElement = (x,y,element) => {
    const {type,x1,x2,y1,y2} = element
    if(type === 'rectangle'){
        const topLeft = nearPoint(x,y,x1,y1,"tl")
        const topRight = nearPoint(x,y,x2,y1,"tr")
        const bottomLeft = nearPoint(x,y,x1,y2,"bl")
        const bottomRight = nearPoint(x,y,x2,y2,"br")
        const inside = x>=x1 && x<=x2 && y>=y1 && y<=y2 ? "inside" : null
        return topLeft || topRight || bottomLeft || bottomRight || inside
    }else if(type === 'line') {
        const start = nearPoint(x,y,x1,y1,"start")
        const end = nearPoint(x,y,x2,y2,"end")
        const inside =  onLine(x1,y1,x2,y2,x,y)
        return start || end || inside
    }else if(type === 'circle'){
        // x1,y1 = center
        // radius = distance between x1,y1 and x2,y2
        const a = {x,y}// point
        const b = {x: x1,y: y1}// center coordinates
        const c = {x: x2,y: y2}// periphery point
        const radius = distance(b,c)
        const inside = distance(a,b) <= radius ? "inside" : null
        const resizeCircle = distance(a,b) - radius <=5 && distance(a,b) >=radius ? "resizeCircle" : null
        return resizeCircle || inside
    }else if(type === 'pencil'){
        const betweenAnyPoint = element.points.some((point,index) => {
            const nextPoint = element.points[index+1]
            if(!nextPoint) return false
            return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) !== null
        })
        return betweenAnyPoint ? "inside" : null
    }else{
        return null
    }
}

export const getElementAtPosition = (x,y,elements)=> {
    return elements
    .map(element => ({...element,position: positionWithInElement(x,y,element)}))
    .find(element => element.position !== null)
}


export const updateElement = (id,x1,y1,x2,y2,type,elements,setElements)=> {
    var elementsCopy = [...elements];
    switch(type) {
        case "line":
        case "rectangle":
        case "circle":
            elementsCopy[id] = createElement(id,x1,y1,x2,y2,type)
            break
        case "pencil":
            elementsCopy[id].points = [...elementsCopy[id].points,{x: x2,y: y2}]
            break
        default:
            throw new Error(`Type not recognized: ${type}`)
    }
    setElements(elementsCopy,true);
}

export const adjustElementCoordinates = (element)=> {
    const {type,x1,y1,x2,y2} = element
    if(type === "rectangle"){
        const minX = Math.min(x1,x2)
        const maxX = Math.max(x1,x2)
        const minY = Math.min(y1,y2)
        const maxY = Math.max(y1,y2)
        return {x1: minX,y1: minY,x2: maxX,y2: maxY}
    }else if(type === "line"){
        if(x1<x2 || (x1===x2 && y1<y2)){
            return {x1,y1,x2,y2}
        }else{
            return {x1: x2,y1: y2,x2: x1,y2: y1}
        }
    }else {
        //circle adjust coordinates
        return {x1,y1,x2,y2}
    }
}


export const cursorForPosition = (position)=> {
    switch(position){
        case "tl":
        case "br":
        case "start":
        case "end":
            return "nwse-resize"
        case "tr":
        case "bl":
            return "nesw-resize"
        case "resizeCircle": 
            return "nesw-resize"
        default:
            return "move"
    }
}