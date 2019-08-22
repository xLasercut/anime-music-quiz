map = require '../support/element-map.coffee'

describe 'game flow tests', () ->
  it 'test happy path selector mode', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25', 'false', 'selector', ['test-user.json'])
    cy.confirmSettings()
    cy.wait(1000)
    cy.assertChatText('Game settings updated', 'exist')
    cy.startGame()
    cy.selectSong('FullmetalAlchemistBrotherhood-OP1')
    cy.notificationMsg('Song selected: Fullmetal Alchemist: Brotherhood - again')
    cy.wait(10000)
    cy.assertSongGuessLock()
    cy.wait(16000)
    cy.assertSongInformation({
      anime: 'Fullmetal Alchemist: Brotherhood',
      title: 'again',
      artist: '...',
      type: 'OP1'
    })

  it 'test happy path normal mode', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25', 'false', 'normal', ['test-user.json'])
    cy.confirmSettings()
    cy.wait(1000)
    cy.assertChatText('Game settings updated', 'exist')
    cy.startGame()
    cy.assertSongCount('1 / 1')
    cy.assertPlayerScore('0')
    cy.wait(5000)
    cy.inputAnimeGuess('Sword Art Online Alternative: Gun Gale Online')
    cy.inputSongGuess('REA(S)ON')
    cy.openSettings()
    cy.assertSettingsDisabled()
    cy.cancelSettings()
    cy.wait(26000)
    cy.assertSongInformation({
      anime: 'Sword Art Online Alternative: Gun Gale Online',
      title: 'REA(S)ON',
      artist: 'ReoNa',
      type: 'Insert'
    })
    cy.assertPlayerGuess('Sword Art Online Alternative: Gun Gale Online - REA(S)ON')
    cy.assertPlayerScore('2')


  it 'test happy path duplicate songs', () ->
    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues('20', '25', 'true', 'normal', ['test-user.json', 'test-user2.json'])
    cy.confirmSettings()
    cy.wait(1000)
    cy.assertChatText('Game settings updated', 'exist')
    cy.startGame()
    cy.assertSongCount('1 / 2')
    cy.wait(41000)
    cy.assertSongCount('2 / 2')
    cy.wait(31000)
