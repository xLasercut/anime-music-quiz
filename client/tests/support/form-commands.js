Cypress.Commands.add('formError', (error) => {
  cy.get('.error--text').contains(error)
})