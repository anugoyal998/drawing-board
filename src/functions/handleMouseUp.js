import {setAction} from '../redux/actions/action.action'


export const handleMouseUp = (dispatch)=> {
  dispatch(setAction('none'))
}