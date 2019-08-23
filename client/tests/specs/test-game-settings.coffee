describe 'game setting panel tests', () ->
  it 'test change settings', () ->
    cy.loginGame()
    cy.openSettings()
    settings = {
      songCount: '20',
      guessTime: '25',
      songSelectTime: '15',
      duplicate: 'false',
      mode:'normal',
      lists: ['test-user.json', 'test-user2.json']
    }

    cy.changeSettingsValues(settings)
    cy.confirmSettings()
    cy.openSettings()
    cy.assertSettingsValues(settings)

  it 'test not change settings', () ->
    cy.loginGame()
    cy.openSettings()
    oldSettings = {
      songCount: '20',
      guessTime: '25',
      songSelectTime: '15',
      duplicate: 'false',
      mode:'normal',
      lists: ['test-user.json', 'test-user2.json']
    }
    newSettings = {
      songCount: '30',
      guessTime: '30',
      songSelectTime: '20',
      duplicate: 'true',
      mode:'selector',
      lists: []
    }
    cy.assertSettingsValues(oldSettings)
    cy.changeSettingsValues(newSettings)
    cy.assertSettingsValues(newSettings)
    cy.cancelSettings()
    cy.openSettings()
    cy.assertSettingsValues(oldSettings)
