map = require '../support/element-map.coffee'

describe 'login page tests', () ->
  it 'test form validation', () ->
    cy.visit('/')
    cy.gameForm()
    cy.login()
    cy.assertLoginError('Server password required')
    cy.assertLoginError('Username required')

    cy.inputUsername('aaaaaaaaaaaaaaaaaaaaaa')
    cy.inputScore('999')
    cy.login()
    cy.assertLoginError('Username must be under 20 characters')
    cy.assertLoginError('Score must be between 0 and 100')

    cy.inputUsername('...')
    cy.login()
    cy.assertLoginError('Username can only contain: 0-9, A-Z, a-z and space')

    cy.listForm()
    cy.login()
    cy.assertLoginError('Server password required')

  it 'test server auth fail', () ->
    cy.visit('/')
    cy.gameForm()
    cy.inputUsername('test user')
    cy.inputPassword('wrong')
    cy.login()
    cy.notificationMsg('Incorrect server password')

  it 'test server auth admin', () ->
    cy.loginList(false)
    cy.isNotElement(map.shared.admin)
    cy.loginList()
    cy.isElement(map.shared.admin)
