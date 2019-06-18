assertUsername = (username) ->
  cy.get('.username').contains(username)

assertMsg = (text) ->
  cy.get('.text').contains(text)

sendMsg = (text) ->
  cy.get('#chat-input').clear().type("#{text}{enter}")

describe 'game chat tests', () ->
  it 'test user chat', () ->
    cy.loginGame()
    chatMsg = 'test chat message'
    sendMsg(chatMsg)
    assertUsername('test user')
    assertMsg(chatMsg)

  it 'test standard emoji', () ->
    cy.loginGame()
    sendMsg(':grinning:')
    assertMsg('😀')

  it 'test custom emoji', () ->
    cy.loginGame()
    sendMsg(':worry:')
    cy.get('.emoji').should('have.attr', 'src', 'https://cdn.discordapp.com/emojis/384946988770131970.png')