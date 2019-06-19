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
    # Add Anime
    cy.loginList()
    selectUserList('test-user.json')
    cy.wait(500)
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'be.enabled', 'be.disabled')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'be.enabled', 'be.disabled')
    checkActionBtns('VHsG0_kKDG4-main', 'be.disabled', 'be.enabled')
    addAnime('ShingekiNoKyojin-OP1-main')

    # Remove Anime
    cy.loginList()
    selectUserList('test-user.json')
    cy.wait(500)
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'be.enabled', 'be.disabled')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'be.disabled', 'be.enabled')
    checkActionBtns('VHsG0_kKDG4-main', 'be.disabled', 'be.enabled')
    removeAnime('ShingekiNoKyojin-OP1-main')

    # Check removed
    cy.loginList()
    selectUserList('test-user.json')
    cy.wait(500)
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'be.enabled', 'be.disabled')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'be.enabled', 'be.disabled')
    checkActionBtns('VHsG0_kKDG4-main', 'be.disabled', 'be.enabled')

  it 'test remove anime user list', () ->
    cy.loginList()
    cy.isNotElement('#user-list-btn')
    selectUserList('test-user.json')
    cy.wait(500)
    cy.isElement('#user-list-btn')
    openUserList()
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-user', 'not.exist', 'not.exist')
    checkActionBtns('ShingekiNoKyojin-OP1-user', 'not.exist', 'not.exist')
    checkActionBtns('VHsG0_kKDG4-user', 'be.disabled', 'be.enabled')
    closeUserList()
    addAnime('ShingekiNoKyojin-OP1-main')

    cy.loginList()
    selectUserList('test-user.json')
    cy.wait(500)
    openUserList()
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-user', 'not.exist', 'not.exist')
    checkActionBtns('ShingekiNoKyojin-OP1-user', 'be.disabled', 'be.enabled')
    checkActionBtns('VHsG0_kKDG4-user', 'be.disabled', 'be.enabled')
    removeAnime('ShingekiNoKyojin-OP1-user')

    cy.loginList()
    selectUserList('test-user.json')
    cy.wait(500)
    openUserList()
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-user', 'not.exist', 'not.exist')
    checkActionBtns('ShingekiNoKyojin-OP1-user', 'not.exist', 'not.exist')
    checkActionBtns('VHsG0_kKDG4-user', 'be.disabled', 'be.enabled')

  it 'test anime filter', () ->
    cy.loginList()
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'exist', 'exist')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'exist', 'exist')
    checkActionBtns('VHsG0_kKDG4-main', 'exist', 'exist')

    # Standard name
    inputFilter('anime-main', 'fullmetal')
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'exist', 'exist')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'not.exist', 'not.exist')
    checkActionBtns('VHsG0_kKDG4-main', 'not.exist', 'not.exist')

    # Alt Name
    inputFilter('anime-main', 'attack on')
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'not.exist', 'not.exist')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'exist', 'exist')
    checkActionBtns('VHsG0_kKDG4-main', 'not.exist', 'not.exist')

    # Song
    clearFilter('anime-main')
    inputFilter('song-main', 'again')
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'exist', 'exist')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'not.exist', 'not.exist')
    checkActionBtns('VHsG0_kKDG4-main', 'not.exist', 'not.exist')

    # Type
    clearFilter('song-main')
    cy.get('.v-select__selections').contains('All').click()
    cy.get('.v-list__tile__title').contains('Insert').click()
    checkActionBtns('FullmetalAlchemistBrotherhood-OP1-main', 'not.exist', 'not.exist')
    checkActionBtns('ShingekiNoKyojin-OP1-main', 'not.exist', 'not.exist')
    checkActionBtns('VHsG0_kKDG4-main', 'exist', 'exist')