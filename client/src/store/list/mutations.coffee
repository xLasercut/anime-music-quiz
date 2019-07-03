export default
  DISCONNECT: (state) ->
    state.filename = ''
  UPDATE_FULL_LIST: (state, list) ->
    state.fullList = list
    state.loading = false
  ADD_ANIME: (state, anime) ->
    state.userList.push(anime)
  REMOVE_ANIME: (state, anime) ->
    for i in [0..state.userList.length - 1]
      if anime.id == state.userList[i].id
        state.userList.splice(i, 1)
  UPDATE_USER_LIST: (state, list) ->
    state.userList = list
  UPDATE_FILENAME: (state, filename) ->
    state.filename = filename
  UPDATE_LOADING: (state, status) ->
    state.loading = status
  SOCKET_SYNC_USER_LIST_FILES: (state, userListFiles) ->
    state.userListFiles = userListFiles
