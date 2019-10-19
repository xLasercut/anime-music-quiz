map = require '../support/element-map.coffee'

fmaId = 'd77c3248-2986-495e-b5c9-ab21151ae501'

describe 'game flow tests', () ->
  it 'test happy path selector mode', () ->
    settings = {
      songCount: '20',
      guessTime: '25',
      songSelectTime: '10',
      duplicate: 'false',
      mode:'selector',
      lists: ['test-user.json']
    }

    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues(settings)
    cy.confirmSettings()
    cy.wait(1000)
    cy.assertChatText('Game settings updated', 'exist')
    cy.startGame()
    cy.selectSong(fmaId)
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
    settings = {
      songCount: '20',
      guessTime: '25',
      songSelectTime: '15',
      duplicate: 'false',
      mode:'normal',
      lists: ['test-user.json']
    }

    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues(settings)
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
    settings = {
      songCount: '20',
      guessTime: '25',
      songSelectTime: '15',
      duplicate: 'true',
      mode:'normal',
      lists: ['test-user.json', 'test-user2.json']
    }

    cy.loginGame()
    cy.openSettings()
    cy.changeSettingsValues(settings)
    cy.confirmSettings()
    cy.wait(1000)
    cy.assertChatText('Game settings updated', 'exist')
    cy.startGame()
    cy.assertSongCount('1 / 2')
    cy.wait(41000)
    cy.assertSongCount('2 / 2')
    cy.wait(31000)
