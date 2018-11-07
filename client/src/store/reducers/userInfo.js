const userInfo = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_USERINFO':
        return Object.assign(state, action.info)
      case 'TOGGLE_TODO':
        // return state.map(
        //   (todo = []) =>
        //     // todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        // )
      default:
        return state
    }
  }
  export default userInfo