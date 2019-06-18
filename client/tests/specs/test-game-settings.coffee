openSettings = () ->
  cy.clickBtn('game-settings-btn')

assertSettingsValue = (songCount, guessTime) ->
  cy.get('#song-count').should('have.value', songCount)
  cy.get('#guess-time').should('have.value', guessTime)

changeSettingsValue = (songCount, guessTime) ->
  cy.get('#song-count').clear().type(songCount)
  cy.get('#guess-time').clear().type(guessTime)

setSettingsValue = (songCount, guessTime) ->
  changeSettingsValue(songCount, guessTime)
  cy.clickBtn('settings-confirm-btn')

describe 'game setting panel tests', () ->
  it 'test change settings', () ->
    cy.loginGame()
    openSettings()
    setSettingsValue('3', '3')
    openSettings()
    assertSettingsValue('31', '31')

  it 'test not change settings', () ->
    cy.loginGame()
    openSettings()
    assertSettingsValue('31', '31')
    changeSettingsValue('2', '2')
    assertSettingsValue('21', '21')
    cy.clickBtn('settings-cancel-btn')
    openSettings()
    assertSettingsValue('31', '31')
