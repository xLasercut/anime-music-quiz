Cypress.Commands.add('elementExist', (element) => {
  cy.get(element).should('exist')
})

Cypress.Commands.add('elementNotExist', (element) => {
  cy.get(element).should('not.exist')
})

Cypress.Commands.add('checkNavBtnsExist', (btns) => {
  for (var btn of btns) {
    cy.elementExist(`#${btn}`)
  }
})

Cypress.Commands.add('checkNavBtnsNotExist', (btns) => {
  for (var btn of btns) {
    cy.elementNotExist(`#${btn}`)
  }
})