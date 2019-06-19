map = require '../support/element-map.coffee'

loginBtns = [ map.login.game, map.login.list ]
gameBtns = [ map.game.settings, map.game.play, map.game.volume ]
listBtns = [ map.list.reload, map.list.userSelect ]

assertNavBarBtnsExist = (btns) ->
  for btn in btns
    cy.isElement(btn)
  return null

assertNavBarBtnsNotExist = (btns) ->
  for btn in btns
    cy.isNotElement(btn)
  return null

describe 'navigation panel tests', () ->
  it 'test login nav buttons', () ->
    cy.visit('/')
    assertNavBarBtnsExist(loginBtns)
    assertNavBarBtnsNotExist(gameBtns.concat(listBtns))

  it 'test game nav buttons', () ->
    cy.loginGame()
    assertNavBarBtnsExist(gameBtns)
    assertNavBarBtnsNotExist(listBtns.concat(loginBtns))

  it 'test list nav buttons', () ->
    cy.loginList()
    assertNavBarBtnsExist(listBtns)
    assertNavBarBtnsNotExist(gameBtns.concat(loginBtns))