function checkSettingsValue(songCount, guessTime) {
  cy.get('#song-count').should('have.value', songCount)
  cy.get('#guess-time').should('have.value', guessTime)
}

function changeSettingsValue(songCount, guessTime) {
  cy.get('#song-count').clear().type(songCount)
  cy.get('#guess-time').clear().type(guessTime)
}

function openSettings() {
  cy.get('#game-settings-btn').click()
}

describe('game page tests', () => {
  it('test game settings', () => {
    cy.loginGame()
    openSettings()
    changeSettingsValue('3', '3')
    cy.get('#settings-confirm-btn').click()
    openSettings()
    checkSettingsValue('31', '31')
    changeSettingsValue('2', '2')
    checkSettingsValue('21', '21')
    cy.get('#settings-cancel-btn').click()
    openSettings()
    checkSettingsValue('31', '31')
    changeSettingsValue('2', '2')
    cy.get('#settings-confirm-btn').click()
    openSettings()
    checkSettingsValue('21', '21')
  })
})