const initialState = {
  message: "initial message",
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }
}

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

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message: message
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE'
  }
}

export default notificationReducer