Cypress.Commands.add 'isElement', (element) =>
  cy.get(element).should('exist')

Cypress.Commands.add 'isNotElement', (element) =>
  cy.get(element).should('not.exist')
