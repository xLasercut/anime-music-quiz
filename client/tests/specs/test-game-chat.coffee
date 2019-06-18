assertUsername = (username) ->
  cy.get('.username').each((item) ->
    item.contains(username)
  )

assertMsg = (text) ->
  cy.get('.text').contains(text)

sendMsg = (text) ->
  cy.get('#chat-input').clear().type("#{text}{enter}")

describe 'game chat tests', () ->
  it 'test user chat', () ->
    cy.loginGame()

    chatMsg = 'test chat message'

    sendMsg(chatMsg)
    cy.wait(1000)
    assertUsername('test user')
    assertMsg(chatMsg)