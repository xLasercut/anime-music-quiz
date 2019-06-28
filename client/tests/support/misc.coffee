map = require './element-map.coffee'

Cypress.Commands.add 'openAddEmoji', () =>
  cy.get(map.misc.addEmoji).click()

Cypress.Commands.add 'inputEmojiCommand', (command) =>
  cy.get(map.misc.emojiCommand).clear().type(command)

Cypress.Commands.add 'inputEmojiSource', (src) =>
  cy.get(map.misc.emojiSrc).clear().type(src)

Cypress.Commands.add 'confirmEmoji', () =>
  cy.get(map.misc.emojiConfirm).click()

Cypress.Commands.add 'addEmoji', (command, src) =>
  cy.openAddEmoji()
  cy.inputEmojiCommand(command)
  cy.inputEmojiSource(src)
  cy.confirmEmoji()