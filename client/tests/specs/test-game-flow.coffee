describe 'game flow tests', () ->
  it 'test happy path normal mode', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25')
    cy.changeGameMode('normal')
    cy.changeGameList()
    cy.confirmSettings()
    cy.assertChatText('Game settings updated', 'exist')
