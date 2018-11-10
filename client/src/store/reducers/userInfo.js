const userInfo = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_USERINFO':
        return Object.assign(state, action.info)
      default:
        return state
    }
  }
  export default userInfo