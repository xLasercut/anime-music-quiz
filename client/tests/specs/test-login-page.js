describe('login page tests', () => {
  it('test form validation', () => {
    cy.visit('/')

    cy.get('#game-btn').click()

    cy.get('#login').click()
    cy.formError('Server password required')
    cy.formError('Username required')

    cy.get('#username').type('aaaaaaaaaaaaaaaaaaaaa')
    cy.get('#score').type('10000')
    cy.get('#login').click()
    cy.formError('Username must be under 20 characters')
    cy.formError('Score must be between 0 and 100')

    cy.get('#username').type('...')
    cy.formError('Username can only contain: 0-9, A-Z, a-z and space')

    cy.get('#list-btn').click()

    cy.get('#login').click()
    cy.formError('Server password required')
  })


  it('test server auth fail', () => {
    cy.visit('/')

    cy.get('#username').type('test user')
    cy.get('#password').type('wrongpassword')
    cy.get('#login').click()
    cy.notificationMsg('Incorrect server password')
  })

  it('test server admin auth', () => {
    cy.visit('/')
    cy.elementNotExist('#admin-panel-btn')
    cy.get('#username').type('test user')
    cy.get('#password').type('server')
    cy.get('#login').click()
    cy.elementNotExist('#admin-panel-btn')

    cy.visit('/')
    cy.elementNotExist('#admin-panel-btn')
    cy.get('#username').type('test user')
    cy.get('#password').type('password')
    cy.get('#login').click()
    cy.elementExist('#admin-panel-btn')
  })
})