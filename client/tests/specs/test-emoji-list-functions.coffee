deleteBtn = (command) ->
  return cy.get("##{command}-delete")

describe 'emoji add page tests', () ->
  it 'test emoji input error', () ->
    cy.loginMisc()
    cy.openAddEmoji()
    cy.confirmEmoji()
    cy.assertInputError('Command only accepts: a-z, A-Z, 0-9')
    cy.assertInputError('Source cannot be empty')

    cy.inputEmojiCommand('eee eee')
    cy.confirmEmoji()
    cy.assertInputError('Command only accepts: a-z, A-Z, 0-9')

    cy.inputEmojiCommand('eeeeeeeeeeeeeeeeeeeee')
    cy.confirmEmoji()
    cy.assertInputError('Command must be between 1-20 characters')

    cy.inputEmojiCommand('worry')
    cy.confirmEmoji()
    cy.assertInputError('Duplicate command')

    cy.inputEmojiCommand('WORRY')
    cy.confirmEmoji()
    cy.assertInputError('Duplicate command')


  it 'test admin', () ->
    cy.loginMisc()
    deleteBtn('grinning').should('be.enabled')
    deleteBtn('notes').should('be.enabled')
    deleteBtn('worry').should('be.enabled')

    cy.loginMisc(false)
    deleteBtn('grinning').should('be.disabled')
    deleteBtn('notes').should('be.disabled')
    deleteBtn('worry').should('be.disabled')

  it 'test add and remove emoji', () ->
    cy.loginMisc()
    deleteBtn('worry2').should('not.exist')
    cy.addEmoji('worry2', 'https://cdn.discordapp.com/emojis/384946988770131970.png')
    cy.loginMisc()
    deleteBtn('worry2').should('exist')
    deleteBtn('worry2').click()
    cy.loginMisc()
    deleteBtn('worry2').should('not.exist')
