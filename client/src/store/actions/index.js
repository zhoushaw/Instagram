
export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const addUserInfo = info => ({
  type: 'ADD_USERINFO',
  info
})


export const VisibilityFilters = {
  SHOW_USER_INFO: 'userInfo',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}