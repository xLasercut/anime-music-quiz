describe 'game setting panel tests', () ->
  it 'test change settings', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25')
    cy.confirmSettings()
    cy.openSettings()
    cy.assertSettingsValues('20', '25')

  it 'test not change settings', () ->
    cy.loginGame()
    cy.openSettings()
    cy.assertSettingsValues('20', '25')
    cy.changeSettingsValues('30', '30')
    cy.cancelSettings()
    cy.openSettings()
    cy.assertSettingsValues('20', '25')
