map = require './element-map.coffee'

Cypress.Commands.add 'inputUsername', (name) =>
  cy.get(map.login.username).clear().type(name)

Cypress.Commands.add 'inputPassword', (password) =>
  cy.get(map.login.password).clear().type(password)

Cypress.Commands.add 'inputScore', (score) =>
  cy.get(map.login.score).clear().type(score)

Cypress.Commands.add 'login', () =>
  cy.get(map.login.login).click()

Cypress.Commands.add 'gameForm', () =>
  cy.get(map.login.game).click()

Cypress.Commands.add 'listForm', () =>
  cy.get(map.login.list).click()

Cypress.Commands.add 'loginGame', (admin=true) =>
  if admin
    password = 'password'
  else
    password = 'server'
  cy.visit('/')
  cy.gameForm()
  cy.inputUsername('test user')
  cy.inputPassword(password)
  cy.login()

Cypress.Commands.add 'loginList', (admin=true) =>
  if admin
    password = 'password'
  else
    password = 'server'
  cy.visit('/')
  cy.listForm()
  cy.inputPassword(password)
  cy.login()

Cypress.Commands.add 'assertLoginError', (error) =>
  cy.get('.error--text').contains(error).should('exist')