export default
  DISCONNECT: (state) ->
    state.filename = ''
  UPDATE_FILENAME: (state, filename) ->
    state.filename = filename
  SOCKET_SYNC_USER_LIST_FILES: (state, userListFiles) ->
    state.userListFiles = userListFiles
  SOCKET_SYNC_FULL_LIST: (state, list) ->
    state.fullList = list
  SOCKET_SYNC_USER_LIST: (state, data) ->
    if data.file == state.filename
      state.userList = data.list
