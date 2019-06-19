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
    cy.selectUserList('test-user.json')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'be.disabled', 'be.enabled')
    cy.addAnime('ShingekiNoKyojin-OP1', type)

    # Remove Anime
    cy.loginList()
    cy.selectUserList('test-user.json')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'be.disabled', 'be.enabled')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'be.disabled', 'be.enabled')
    cy.removeAnime('ShingekiNoKyojin-OP1', type)

    # Check Removed
    cy.loginList()
    cy.selectUserList('test-user.json')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'be.enabled', 'be.disabled')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'be.disabled', 'be.enabled')

  it 'test remove anime user list', () ->
    type = 'user'
    cy.loginList()
    cy.selectUserList('test-user.json')
    cy.openUserList()
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'be.disabled', 'be.enabled')
    cy.closeUserList()
    cy.addAnime('ShingekiNoKyojin-OP1', 'main')

    cy.loginList()
    cy.selectUserList('test-user.json')
    cy.openUserList()
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'be.disabled', 'be.enabled')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'be.disabled', 'be.enabled')
    cy.removeAnime('ShingekiNoKyojin-OP1', type)

    cy.loginList()
    cy.selectUserList('test-user.json')
    cy.openUserList()
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'be.disabled', 'be.enabled')

  it 'test anime filter', () ->
    type = 'main'
    cy.loginList()
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'exist', 'exist')

    # Standard name
    cy.animeFilter(type).clear().type('fullmetal')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'not.exist', 'not.exist')
    cy.animeFilter(type).clear().type('FULLMETAL')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'not.exist', 'not.exist')

    # Alt name
    cy.animeFilter(type).clear().type('attack on')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'not.exist', 'not.exist')
    cy.animeFilter(type).clear().type('ATTACK ON')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'not.exist', 'not.exist')

    # Song
    cy.animeFilter(type).clear()
    cy.songFilter(type).clear().type('again')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'not.exist', 'not.exist')
    cy.songFilter(type).clear().type('AGAIN')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'exist', 'exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'not.exist', 'not.exist')

    # Type
    cy.songFilter(type).clear()
    cy.selectTypeFilter(type, 'Insert')
    cy.assertActionBtns('FullmetalAlchemistBrotherhood-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('ShingekiNoKyojin-OP1', type, 'not.exist', 'not.exist')
    cy.assertActionBtns('VHsG0_kKDG4', type, 'exist', 'exist')
