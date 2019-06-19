map = require './element-map.coffee'

Cypress.Commands.add 'openSettings', () =>
  cy.get(map.game.settings).click()

Cypress.Commands.add 'assertSettingsValues', (songCount, guessTime) =>
  cy.get(map.game.settingsSongCount).should('have.value', songCount)
  cy.get(map.game.settingsGuessTime).should('have.value', guessTime)

Cypress.Commands.add 'changeSettingsValues', (songCount, guessTime) =>
  cy.get(map.game.settingsSongCount).clear().type("{del}#{songCount}")
  cy.get(map.game.settingsGuessTime).clear().type("{del}#{guessTime}")

Cypress.Commands.add 'changeGameMode', (mode) =>
  if mode == 'gamble'
    cy.get(map.game.settingsGameModeGamble).click({ force: true })
  else
    cy.get(map.game.settingsGameModeNormal).click({ force: true })

Cypress.Commands.add 'changeGameList', () =>
  cy.get('.v-label').contains('test-user.json').click()

Cypress.Commands.add 'confirmSettings', () =>
  cy.get(map.game.settingsConfirm).click()

Cypress.Commands.add 'cancelSettings', () =>
  cy.get(map.game.settingsCancel).click()

Cypress.Commands.add 'assertChatUser', (user, status) =>
  cy.get(map.game.chatUser).contains(user).should(status)

Cypress.Commands.add 'assertChatText', (text, status) =>
  cy.get(map.game.chatText).contains(text).should(status)

Cypress.Commands.add 'sendChat', (text) =>
  cy.get(map.game.chatInput).clear().type("#{text}{enter}")