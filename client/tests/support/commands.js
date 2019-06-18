// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('notificationMsg', (msg) => {
  cy.get('#game-notification').contains(msg)
})

Cypress.Commands.add('loginGame', () => {
  cy.visit('/')
  cy.get('#game-btn').click()
  cy.get('#username').type('testuser')
  cy.get('#password').type('password')
  cy.get('#login').click()
})

Cypress.Commands.add('loginList', () => {
  cy.visit('/')
  cy.get('#list-btn').click()
  cy.get('#password').type('password')
  cy.get('#login').click()
})