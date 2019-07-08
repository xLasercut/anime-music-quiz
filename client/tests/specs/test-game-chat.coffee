describe 'game chat tests', () ->
  it 'test user chat', () ->
    cy.loginGame()
    cy.assertChatUser('test user', 'not.exist')
    chatMsg = 'test chat message'
    cy.sendChat(chatMsg)
    cy.wait(1000)
    cy.assertChatUser('test user', 'exist')
    cy.assertChatText(chatMsg, 'exist')

  it 'test standard emoji', () ->
    cy.loginGame()
    cy.assertChatText('😀', 'not.exist')
    cy.assertChatUser('test user', 'not.exist')
    cy.sendChat(':grinning:')
    cy.wait(1000)
    cy.assertChatUser('test user', 'exist')
    cy.assertChatText('😀', 'exist')

  it 'test custom emoji', () ->
    cy.loginGame()
    cy.assertChatUser('test user', 'not.exist')
    cy.get('.emoji').should('not.exist')
    cy.sendChat(':worry:')
    cy.wait(1000)
    cy.assertChatUser('test user', 'exist')
    cy.get('.emoji').should('have.attr', 'src', 'https://cdn.discordapp.com/emojis/384946988770131970.png')

  it 'test chat bot response', () ->
    cy.loginGame()
    cy.assertChatUser('Toyota Sprinter Trueno AE86', 'not.exist')
    cy.sendChat('deja vu')
    cy.wait(1000)
    cy.assertChatUser('Toyota Sprinter Trueno AE86', 'exist')
    cy.assertChatText('🎶 I\'ve just been in this place before\nHigher on the street\nAnd I know it\'s my time to go 🎶', 'exist')
