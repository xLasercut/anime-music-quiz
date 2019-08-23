map = require './element-map.coffee'

Cypress.Commands.add 'openSettings', () =>
  cy.get(map.game.settings).click()

Cypress.Commands.add 'assertSettingsValues', (settings) =>
  cy.get(map.game.settingsSongCount).should('have.value', settings.songCount)
  cy.get(map.game.settingsGuessTime).should('have.value', settings.guessTime)
  cy.get(map.game.settingsSongSelectTime).should('have.value', settings.songSelectTime)

  if settings.duplicate == 'true'
    cy.get(map.game.settingsDuplicateTrue).should('have.attr', 'aria-checked', 'true')
    cy.get(map.game.settingsDuplicateFalse).should('have.attr', 'aria-checked', 'false')
  else
    cy.get(map.game.settingsDuplicateTrue).should('have.attr', 'aria-checked', 'false')
    cy.get(map.game.settingsDuplicateFalse).should('have.attr', 'aria-checked', 'true')

  if settings.mode == 'normal'
    cy.get(map.game.settingsGameModeNormal).should('have.attr', 'aria-checked', 'true')
    cy.get(map.game.settingsGameModeSelector).should('have.attr', 'aria-checked', 'false')
  else
    cy.get(map.game.settingsGameModeNormal).should('have.attr', 'aria-checked', 'false')
    cy.get(map.game.settingsGameModeSelector).should('have.attr', 'aria-checked', 'true')

  cy.wrap(settings.lists)
  .each (item) =>
    cy.get("#setting-user-list-#{item.replace('.json', '')}").should('have.attr', 'aria-checked', 'true')

Cypress.Commands.add 'changeSettingsValues', (settings) =>
  cy.get(map.game.settingsSongCount).clear().type("{del}#{settings.songCount}")
  cy.get(map.game.settingsGuessTime).clear().type("{del}#{settings.guessTime}")
  cy.get(map.game.settingsSongSelectTime).clear().type("{del}{del}#{settings.songSelectTime}")
  cy.get('[type="radio"]').check([settings.duplicate, settings.mode], { force: true })
  cy.get('[type="checkbox"]').uncheck({ force: true })
  cy.wrap(settings.lists)
  .each (item) =>
    cy.get("#setting-user-list-#{item.replace('.json', '')}").check({ force: true })

Cypress.Commands.add 'confirmSettings', () =>
  cy.get(map.game.settingsConfirm).click()

Cypress.Commands.add 'cancelSettings', () =>
  cy.get(map.game.settingsCancel).click()

Cypress.Commands.add 'assertChatUser', (user, status) =>
  cy.get(map.game.chatUser).contains(user).should(status)

Cypress.Commands.add 'assertChatText', (text, status) =>
  cy.get(map.game.chatText).contains(text).should(status)

Cypress.Commands.add 'sendChat', (text) =>
  cy.get(map.game.chatInput).clear().type("#{text}{enter}")

Cypress.Commands.add 'assertSongInformation', (info) =>
  cy.get(map.game.songAnime).contains(info.anime).should('exist')
  cy.get(map.game.songTitle).contains(info.title).should('exist')
  cy.get(map.game.songArtist).contains(info.artist).should('exist')
  cy.get(map.game.songType).contains(info.type).should('exist')

Cypress.Commands.add 'assertPlayerScore', (score) =>
  cy.get(map.game.playerScore).contains(score).should('exist')

Cypress.Commands.add 'assertPlayerGuess', (guess) =>
  cy.get(map.game.playerGuess).contains(guess).should('be.visible')

Cypress.Commands.add 'assertSongCount', (count) =>
  cy.get(map.game.gameSongCount).should('contain', count)

Cypress.Commands.add 'startGame', () =>
  cy.get(map.game.play).click()
  cy.isElement(map.game.stop)
  cy.isNotElement(map.game.play)

Cypress.Commands.add 'inputAnimeGuess', (text) =>
  cy.get(map.game.animeGuess).clear().type(text)
  cy.get('.v-list-item__title').contains(text).click()

Cypress.Commands.add 'inputSongGuess', (text) =>
  cy.get(map.game.songGuess).clear().type(text)
  cy.get('.v-list-item__title').contains(text).click()

Cypress.Commands.add 'assertSettingsDisabled', () =>
  cy.get(map.game.settingsSongCount).should('be.disabled')
  cy.get(map.game.settingsGuessTime).should('be.disabled')

Cypress.Commands.add 'selectSong', (id) =>
  cy.get("##{id}-select-btn").click()

Cypress.Commands.add 'assertSongGuessLock', () =>
  cy.get(map.game.songGuess).should('be.disabled')
  cy.get(map.game.animeGuess).should('be.disabled')