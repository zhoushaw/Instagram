const defaultValue = {
    avatarUrl: '',
    username: '',
    account: '',
    abstract: '',
    email: ''
}

const userInfo = (state = defaultValue, action) => {
    switch (action.type) {
      case 'ADD_USERINFO':
        return Object.assign({}, state, action.info)
      default:
        return state
    }
  }
  export default userInfo