Cypress.Commands.add 'notificationMsg', (msg) =>
  cy.get('#game-notification').contains(msg)

Cypress.Commands.add 'loginGame', () =>
  cy.visit('/')
  cy.get('#game-btn').click()
  cy.get('#username').type('test user')
  cy.get('#password').type('password')
  cy.get('#login').click()

Cypress.Commands.add 'loginList', () =>
  cy.visit('/')
  cy.get('#list-btn').click()
  cy.get('#password').type('password')
  cy.get('#login').click()

Cypress.Commands.add 'clickBtn', (id) =>
  cy.get("##{id}").click()
