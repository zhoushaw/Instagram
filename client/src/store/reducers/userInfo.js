const defaultValue = {
    avatarUrl: '',
    username: null,
    account: '',
    abstract: false,
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