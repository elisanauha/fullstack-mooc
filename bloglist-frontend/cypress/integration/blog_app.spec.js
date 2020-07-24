describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Terry Tester',
      username: 'ttester',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ttester')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Terry Tester logged in')
    })

    // it('logout succeeds', function () {
    //   cy.get('logout').click()
    //   cy.contains('username')
    //   cy.contains('password')
    //   cy.contains('login')
    // })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ttester')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .contains('wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Terry Tester logged in')
    })
  })
})
