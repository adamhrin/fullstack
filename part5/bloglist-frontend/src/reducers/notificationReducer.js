const initialState = {
  message: 'initial message',
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }
}

var timeoutID

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message,
        style: {
          ...state.style,
          display: ''
        }
      }
    case 'HIDE':
      return {
        ...state,
        style: {
          ...state.style,
          display: 'none'
        }
      }
    default:
      return state
  }
}

export const setMessage = (message, duration = 5) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_MESSAGE',
      message: message
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, duration * 1000)
  }
}

export default notificationReducer