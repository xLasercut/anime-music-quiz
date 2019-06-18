assertNavBarBtnsExist = (btns) ->
  for btn in btns
    cy.isElement("##{btn}")
  return null

assertNavBarBtnsNotExist = (btns) ->
  for btn in btns
    cy.isNotElement("##{btn}")
  return null

describe 'client routing tests', () ->
  it 'test redirect when not connected to server', () ->
    cy.visit('#/home')
    cy.url().should('eq', "#{Cypress.config().baseUrl}/#/")

    cy.visit('#/list')
    cy.url().should('eq', "#{Cypress.config().baseUrl}/#/")

  it 'test nav panel buttons', () ->
    navBtnGame = [ 'game-settings-btn', 'game-play-btn', 'game-volume-slider' ]
    navBtnList = [ 'full-list-reload-btn', 'user-list-select' ]
    navBtnHome = [ 'game-btn', 'list-btn' ]

    # Home
    cy.visit('/')
    cy.isNotElement('#home-btn')
    assertNavBarBtnsExist(navBtnHome)
    assertNavBarBtnsNotExist(navBtnGame.concat(navBtnList))

    # Game
    cy.loginGame()
    cy.isElement('#home-btn')
    assertNavBarBtnsExist(navBtnGame)
    assertNavBarBtnsNotExist(navBtnHome.concat(navBtnList))

    # List
    cy.loginList()
    cy.isElement('#home-btn')
    assertNavBarBtnsExist(navBtnList)
    assertNavBarBtnsNotExist(navBtnHome.concat(navBtnGame))