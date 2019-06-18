assertError = (error) ->
  cy.get('.error--text').contains(error)

inputText = (id, text) ->
  cy.get("##{id}").clear().type(text)

describe 'login page tests', () ->
  it 'test form validation', () ->
    cy.visit('/')

    cy.clickBtn('game-btn')
    cy.clickBtn('login')
    assertError('Server password required')
    assertError('Username required')

    inputText('username', 'aaaaaaaaaaaaaaaaaaaaa')
    inputText('score', '999')
    cy.clickBtn('login')
    assertError('Username must be under 20 characters')
    assertError('Score must be between 0 and 100')

    inputText('username', '...')
    cy.clickBtn('login')
    assertError('Username can only contain: 0-9, A-Z, a-z and space')

    cy.clickBtn('list-btn')
    cy.clickBtn('login')
    assertError('Server password required')

  it 'test server auth fail', () ->
    cy.visit('/')

    inputText('username', 'test user')
    inputText('password', 'wrongpassword')
    cy.clickBtn('login')
    cy.notificationMsg('Incorrect server password')
