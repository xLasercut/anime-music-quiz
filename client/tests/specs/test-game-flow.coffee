map = require '../support/element-map.coffee'

describe 'game flow tests', () ->
  it 'test happy path normal mode', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25')
    cy.changeGameMode('normal')
    cy.confirmSettings()
    cy.assertChatText('Game settings updated', 'exist')
    cy.startGame()
    cy.wait(5000)
    cy.inputAnimeGuess('Sword Art Online Alternative: Gun Gale Online')
    cy.inputSongGuess('REA(S)ON')
    cy.wait(30000)
    cy.assertSongInformation({
      anime: 'Sword Art Online Alternative: Gun Gale Online',
      title: 'REA(S)ON',
      artist: 'ReoNa',
      type: 'Insert'
    })