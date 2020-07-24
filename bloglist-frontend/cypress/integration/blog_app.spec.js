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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ttester', password: 'password' })

      const user2 = {
        name: 'Andrew User',
        username: 'anuser',
        password: 'password',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
    })

    it('A blog can be created', function () {
      cy.contains('new blog')
      cy.get('#new-blog').click()
      cy.get('#title').type('A new blog to add')
      cy.get('#author').type('New Author')
      cy.get('#url').type('www.example.com')
      cy.get('#create-button').click()
      cy.get('.notification')
        .contains('A new blog')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blogStyle').contains('A new blog to add New Author')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'A new blog to add',
        author: 'New Author',
        url: 'www.example.com',
        likes: 0,
      })
      cy.get('.view-button').click()
      cy.contains('likes 0')
      cy.get('.like-button').click()
      cy.contains('likes 1')
      cy.get('.like-button').click()
      cy.contains('likes 2')
    })

    it('A blog can be deleted by user', function () {
      cy.createBlog({
        title: 'A new blog to add',
        author: 'New Author',
        url: 'www.example.com',
        likes: 0,
      })
      cy.get('.view-button').click()
      cy.contains('likes 0')
      cy.get('.remove-button').click()
      cy.get('html').should('not.contain', 'A new blog to add New Author')
    })

    it('A blog can not be deleted by other user', function () {
      cy.createBlog({
        title: 'A new blog to add',
        author: 'New Author',
        url: 'www.example.com',
        likes: 0,
      })
      cy.get('.view-button').click()
      cy.get('.blogStyle').should('contain', 'remove')

      cy.get('#logout-button').click()
      cy.login({ username: 'anuser', password: 'password' })

      cy.get('.blogStyle').should('not.contain', 'remove')
      cy.get('html').contains('A new blog to add New Author')
    })

    it.only('blogs ordered according to likes', function () {
      // Create blogs with different number of likes and check one with most likes is first.
      cy.createBlog({
        title: 'A new blog to add',
        author: 'New Author',
        url: 'www.example.com',
        likes: 0,
      })
      cy.get('.view-button').click({ multiple: true })
      cy.get('.blogStyle').first().contains('likes 0')
      cy.createBlog({
        title: 'A second blog to add',
        author: 'Second Author',
        url: 'www.example.com',
        likes: 5,
      })
      cy.get('.view-button').click({ multiple: true })
      cy.get('.blogStyle').first().contains('likes 5')
      cy.get('.blogStyle').last().contains('likes 0')
      cy.createBlog({
        title: 'A third blog to add',
        author: 'Third Author',
        url: 'www.example.com',
        likes: 2,
      })
      cy.get('.view-button').click({ multiple: true })
      cy.get('.blogStyle').first().contains('likes 5')
      cy.get('.blogStyle').last().contains('likes 0')
      cy.createBlog({
        title: 'A fourth blog to add',
        author: 'Fourth Author',
        url: 'www.example.com',
        likes: 8,
      })
      cy.get('.view-button').click({ multiple: true })
      cy.get('.blogStyle').first().contains('likes 8')
      cy.get('.blogStyle').last().contains('likes 0')
    })
  })
})
