describe('client routing tests', () => {
  it('test redirect when not connected to server', () => {
    cy.visit('#/home')
    cy.url().should('eq', "#{Cypress.config().baseUrl}/#/")

    cy.visit('#/list')
    cy.url().should('eq', "#{Cypress.config().baseUrl}/#/")

    cy.visit('#/misc')
    cy.url().should('eq', "#{Cypress.config().baseUrl}/#/")
  })
})
