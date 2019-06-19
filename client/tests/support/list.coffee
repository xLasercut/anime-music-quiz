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