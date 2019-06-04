{ UserLists, FullList } = require '../database/database.coffee'


userLists = new UserLists()
fullList = new FullList()

for file in userLists.files
  updated = []
  diff = []
  for song in userLists.singleList(file)
    canUpdate = false
    for item in fullList.read()
      if song.id == item.id
        canUpdate = true
        updated.push(item)
        break

    if !canUpdate
      diff.push(song)

  if diff.length > 0
    console.log("Not updated #{file}. Diffs found:")
    console.log(diff)
  else
    userLists.write(file, updated)
    console.log("#{file} updated")

