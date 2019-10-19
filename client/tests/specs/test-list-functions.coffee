fmaId = 'd77c3248-2986-495e-b5c9-ab21151ae501'
aotId = 'e7096454-f0b1-4041-b21d-478dc9c9d253'
ggoReasonId = '15eeddb9-0800-4d87-adf8-1df8e7662011'
ggoPilgrimId = '81ced164-9d4f-403e-b3f6-9e495f4a2509'

getActionBtn = (id, type) ->
  return cy.get("##{type}-#{id}")

getFilter = (id) ->
  return cy.get("#filter-#{id}")

selectUserList = (user) ->
  cy.get('.selector-container').click()
  cy.get('.v-list__tile__title').contains(user).click()

checkActionBtns = (id, addState, removeState) ->
  getActionBtn(id, 'add').should(addState)
  getActionBtn(id, 'remove').should(removeState)

addAnime = (id) ->
  getActionBtn(id, 'add').click()

removeAnime = (id) ->
  getActionBtn(id, 'remove').click()

openUserList = () ->
  cy.clickBtn('user-list-btn')

closeUserList = () ->
  cy.clickBtn('close-user-list-btn')

inputFilter = (id, text) ->
  getFilter(id).clear().type(text)

clearFilter = (id) ->
  getFilter(id).clear()

describe 'test song list functions', () ->
  it 'test add and remove anime main list', () ->
    type = 'main'

    # Add Anime
    cy.loginList()
    cy.selectUserList('test-user')
    cy.assertActionBtns(fmaId, type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns(aotId, type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns(ggoReasonId, type, 'be.disabled', 'be.enabled')
    cy.addAnime(aotId, type)

    # Remove Anime
    cy.loginList()
    cy.selectUserList('test-user')
    cy.assertActionBtns(fmaId, type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns(aotId, type, 'be.disabled', 'be.enabled')
    cy.assertActionBtns(ggoReasonId, type, 'be.disabled', 'be.enabled')
    cy.removeAnime(aotId, type)

    # Check Removed
    cy.loginList()
    cy.selectUserList('test-user')
    cy.assertActionBtns(fmaId, type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns(aotId, type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns(ggoReasonId, type, 'be.disabled', 'be.enabled')

  it 'test remove anime user list', () ->
    type = 'user'
    cy.loginList()
    cy.selectUserList('test-user')
    cy.openUserList()
    cy.assertActionBtns(fmaId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'be.disabled', 'be.enabled')
    cy.closeUserList()
    cy.addAnime(aotId, 'main')

    cy.loginList()
    cy.selectUserList('test-user')
    cy.openUserList()
    cy.assertActionBtns(fmaId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(aotId, type, 'be.disabled', 'be.enabled')
    cy.assertActionBtns(ggoReasonId, type, 'be.disabled', 'be.enabled')
    cy.removeAnime(aotId, type)

    cy.loginList()
    cy.selectUserList('test-user')
    cy.openUserList()
    cy.assertActionBtns(fmaId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'be.disabled', 'be.enabled')

  it 'test anime filter', () ->
    type = 'main'
    cy.loginList()
    cy.assertActionBtns(fmaId, type, 'exist', 'exist')
    cy.assertActionBtns(aotId, type, 'exist', 'exist')
    cy.assertActionBtns(ggoReasonId, type, 'exist', 'exist')

    # Standard name
    cy.animeFilter(type).clear().type('fullmetal')
    cy.assertActionBtns(fmaId, type, 'exist', 'exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'not.exist', 'not.exist')
    cy.animeFilter(type).clear().type('FULLMETAL')
    cy.assertActionBtns(fmaId, type, 'exist', 'exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'not.exist', 'not.exist')

    # Alt name
    cy.animeFilter(type).clear().type('attack on')
    cy.assertActionBtns(fmaId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(aotId, type, 'exist', 'exist')
    cy.assertActionBtns(ggoReasonId, type, 'not.exist', 'not.exist')
    cy.animeFilter(type).clear().type('ATTACK ON')
    cy.assertActionBtns(fmaId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(aotId, type, 'exist', 'exist')
    cy.assertActionBtns(ggoReasonId, type, 'not.exist', 'not.exist')

    # Song
    cy.animeFilter(type).clear()
    cy.songFilter(type).clear().type('again')
    cy.assertActionBtns(fmaId, type, 'exist', 'exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'not.exist', 'not.exist')
    cy.songFilter(type).clear().type('AGAIN')
    cy.assertActionBtns(fmaId, type, 'exist', 'exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'not.exist', 'not.exist')

    # Type
    cy.songFilter(type).clear()
    cy.selectTypeFilter(type, 'Insert')
    cy.assertActionBtns(fmaId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(aotId, type, 'not.exist', 'not.exist')
    cy.assertActionBtns(ggoReasonId, type, 'exist', 'exist')
