map = require './element-map.coffee'

getActionBtn = (id, action, type) ->
  return cy.get("##{action}-#{id}-#{type}")

Cypress.Commands.add 'selectUserList', (user) =>
  cy.get(map.list.userSelect).click({ force: true })
  cy.wait(500)
  cy.get(map.shared.selectItem).contains(user).click()
  cy.wait(500)

Cypress.Commands.add 'assertActionBtns', (id, type, addState, removeState) =>
  getActionBtn(id, 'add', type).should(addState)
  getActionBtn(id, 'remove', type).should(removeState)

Cypress.Commands.add 'assertAdminActionBtns', (id, type, editState, deleteState) =>
  getActionBtn(id, 'edit', type).should(editState)
  getActionBtn(id, 'delete', type).should(deleteState)

Cypress.Commands.add 'addAnime', (id, type) =>
  getActionBtn(id, 'add', type).click()

Cypress.Commands.add 'removeAnime', (id, type) =>
  getActionBtn(id, 'remove', type).click()

Cypress.Commands.add 'openUserList', () =>
  cy.get(map.list.userList).click()

Cypress.Commands.add 'closeUserList', () =>
  cy.get(map.list.userListClose).click()

Cypress.Commands.add 'songFilter', (type) =>
  return cy.get("#{map.list.filterSong}-#{type}")

Cypress.Commands.add 'animeFilter', (type) =>
  return cy.get("#{map.list.filterAnime}-#{type}")

Cypress.Commands.add 'selectTypeFilter', (type, item) =>
  cy.get("#{map.list.filterType}-#{type}").click({ force: true })
  cy.wait(500)
  cy.get(map.shared.selectItem).contains(item).click()
  cy.wait(500)

Cypress.Commands.add 'openAddSongToList', () =>
  cy.get(map.list.addSongToList).click()

Cypress.Commands.add 'closeAddSongToList', () =>
  cy.get('#add-song-to-list-cancel').click()

Cypress.Commands.add 'addSongToList', (anime, src, title, artist, type) =>
  cy.openAddSongToList()
  cy.get('#add-song-to-list-anime').clear().type("#{anime}{enter}{esc}")
  cy.get('#add-song-to-list-add-anime').click()

  cy.get('#add-song-to-list-src').clear().type(src)
  cy.get('#add-song-to-list-title').clear().type(title)
  cy.get('#add-song-to-list-artist').clear().type(artist)
  cy.get('#add-song-to-list-type').clear().type(type)

  cy.get('#add-song-to-list-confirm').click()

Cypress.Commands.add 'reloadSongList', () =>
  cy.get(map.list.reload).click()

Cypress.Commands.add 'deleteSongFromList', (id, type) =>
  getActionBtn(id, 'delete', type).click()

Cypress.Commands.add 'editSongInList', (id, src, title, artist, type) =>
  getActionBtn(id, 'edit', 'main').click()

  cy.get('#add-song-to-list-src').clear().type(src)
  cy.get('#add-song-to-list-title').clear().type(title)
  cy.get('#add-song-to-list-artist').clear().type(artist)
  cy.get('#add-song-to-list-type').clear().type(type)

  cy.get('#add-song-to-list-confirm').click()

Cypress.Commands.add 'assertSongInfo', (id, title, type) =>
  getActionBtn(id, 'title', 'main').should('contain', title)
  getActionBtn(id, 'type', 'main').should('contain', type)
