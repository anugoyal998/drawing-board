import {setAction} from '../redux/actions/action.action'
import {setSelectedElement} from '../redux/actions/selectedElement.action'


export const handleMouseUp = (dispatch)=> {
  dispatch(setAction('none'))
  dispatch(setSelectedElement(null))
}