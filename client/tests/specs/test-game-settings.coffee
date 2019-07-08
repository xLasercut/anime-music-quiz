describe 'game setting panel tests', () ->
  it 'test change settings', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25', 'false', 'normal', ['test-user.json', 'test-user2.json'])
    cy.confirmSettings()
    cy.openSettings()
    cy.assertSettingsValues('20', '25', 'false', 'normal', ['test-user.json', 'test-user2.json'])

  it 'test not change settings', () ->
    cy.loginGame()
    cy.openSettings()
    cy.assertSettingsValues('20', '25', 'false', 'normal', ['test-user.json', 'test-user2.json'])
    cy.changeSettingsValues('30', '30', 'true', 'gamble', [])
    cy.assertSettingsValues('30', '30', 'true', 'gamble', [])
    cy.cancelSettings()
    cy.openSettings()
    cy.assertSettingsValues('20', '25', 'false', 'normal', ['test-user.json', 'test-user2.json'])
