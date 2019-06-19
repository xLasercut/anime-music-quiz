map = require './element-map.coffee'

Cypress.Commands.add 'notificationMsg', (msg) =>
  cy.get(map.shared.notification).contains(msg).should('exist')

Cypress.Commands.add 'isElement', (element) =>
  cy.get(element).should('exist')

Cypress.Commands.add 'isNotElement', (element) =>
  cy.get(element).should('not.exist')