export const resizedCoordinates = (clientX,clientY,position,coordinates) => {
    const {x1,y1,x2,y2} = coordinates
    switch(position) {
        case "tl":
        case "start":
            return {x1: clientX, y1: clientY, x2,y2}
        case "tr":
            return {x1,y1: clientY,x2: clientX,y2}
        case "bl":
            return {x1: clientX,y1,x2,y2: clientY}
        case "br":
        case "end": 
        case "resizeCircle":
            return {x1,y1,x2: clientX,y2: clientY}
        default:
            return null
    }
}