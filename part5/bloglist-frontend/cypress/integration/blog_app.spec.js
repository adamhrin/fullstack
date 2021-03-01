describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Adam Hrin',
      username: 'adam',
      password: 'adam'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3002')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('adam')
      cy.get('#password').type('adam')
      cy.get('#loginBtn').click()

      cy.contains('Adam Hrin logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('adam')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Adam Hrin logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'adam', password: 'adam' })
    })

    it('A blog can be created', function() {
      cy.get('#createNewBlogBtn').click()
      cy.get('#title').type('blog title by cypress')
      cy.get('#author').type('cypress blog author')
      cy.get('#url').type('https://cypress.com')
      cy.get('#createBtn').click()
      cy.contains('blog title by cypress cypress blog author')
    })

    describe('and blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'cypress blog',
          author: 'cypress author',
          url: 'https://cypress.com'
        })
      })

      it('blog can be liked', function () {
        cy.contains('view').click()
        cy.get('#likeBtn').click()
        cy.contains('likes 1')
      })

      it('user can delete blog', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'blog title by cypress cypress blog author')
      })

      it('other user cannot delete blog', function () {
        cy.contains('logout').click()

        const anotherUser = {
          name: 'Kim Nilson',
          username: 'kimnilson',
          password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)

        cy.login({ username: 'kimnilson', password: 'password' })
        cy.contains('view').click()
        cy.get('#removeBtn').should('have.css', 'display', 'none')
      })

      describe('and more blogs are added', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'cypress blog 2',
            author: 'cypress author 2',
            url: 'https://cypress.com'
          })
          cy.createBlog({
            title: 'cypress blog 3',
            author: 'cypress author',
            url: 'https://cypress.com'
          })

          cy.viewAll()

          cy.get('.likeBtn').then( buttons => {
            cy.wrap(buttons[0]).click()
            cy.wrap(buttons[0]).click()
            cy.wrap(buttons[0]).click()
            cy.wrap(buttons[1]).click()
            cy.wrap(buttons[1]).click()
            cy.wrap(buttons[1]).click()
            cy.wrap(buttons[1]).click()
            cy.wrap(buttons[2]).click()
          })
        })

        it('blogs are ordered according to likes', function () {
          cy.visit('http://localhost:3002')
          cy.get('.blog').then(($blogs) => {
            const likesArrObj = $blogs.map((i, el) => {
              return Cypress.$(el).text().split('likes ')[1].split('like')[0]
            })

            cy.wrap(likesArrObj[0]).should('equal', '4')
            cy.wrap(likesArrObj[1]).should('equal', '3')
            cy.wrap(likesArrObj[2]).should('equal', '1')
          })
        })
      })
    })
  })
})