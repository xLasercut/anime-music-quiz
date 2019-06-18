function checkNavBtnsExist(btns) {
  for (var btn of btns) {
    cy.elementExist(`#${btn}`)
  }
}


describe('client routing tests', () => {
  it('test redirect on not connected', () => {
    cy.visit('#/home')
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`)

    cy.visit('#/list')
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`)
  })

  it('test nav panel buttons', () => {
    var navBtnGame = [
      'game-settings-btn', 'game-play-btn', 'admin-panel-btn', 'game-volume-slider'
    ]

    var navBtnList = [
      'full-list-reload-btn', 'user-list-select'
    ]

    var navBtnHome = [
      'game-btn', 'list-btn'
    ]


    // Home
    cy.visit('/')
    cy.elementNotExist('#home-btn')
    cy.checkNavBtnsExist(navBtnHome)
    cy.checkNavBtnsNotExist(navBtnGame.concat(navBtnList))

    // Game
    cy.loginGame()
    cy.elementExist('#home-btn')
    cy.checkNavBtnsExist(navBtnGame)
    cy.checkNavBtnsNotExist(navBtnHome.concat(navBtnList))

    // List
    cy.loginList()
    cy.elementExist('#home-btn')
    cy.checkNavBtnsExist(navBtnList)
    cy.checkNavBtnsNotExist(navBtnHome.concat(navBtnGame))
  })

})