describe('Blog', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'blogtester',
      name: 'tester',
      password: 'root'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
  })

  it('can login', () => {
    cy.get('#username').type('blogtester')
    cy.get('#password').type('root')
    cy.get('#login-button').click()
    cy.contains('tester logged-in')
  })

  it('login fails with wrong credentials', () => {
    cy.get('#username').type('blogtester')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').contains('Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'blogtester', password: 'root' })
    })

    it('can create a blog', () => {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://blogsbycypress.com/cypressfirstblog.html')
      cy.contains('Add Blog').click()
      cy.get('.success').contains('A blog blog by cypress by cypress added')
    })

    describe('when blog exists', () => {
      beforeEach(() => {
        cy.createBlog({ 
          title: 'first blog',
          author: 'cypress',
          url: 'https://cypressblogs.com'
        })
      })

      it('blog can likes', () => {
        cy.contains('first blog').parent().find('button').contains('view').click()
        cy.contains('first blog').parent().find('button').contains('like').click()
        cy.get('.likes').then((likesDiv) => {
          const likes = likesDiv.text()
          cy.get('.likes').should('contain.text', `Likes ${Number((likes[6] + 1).toString())}` )
        }) 
      })
    })

    describe('when deleting a blog', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress',
          url: 'http://cypressblogs.com'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'cypress',
          url: 'http://cypressblogs.com'
        })
        cy.createBlog({
          title: 'third blog',
          author: 'cypress',
          url: 'http://cypressblogs.com'
        })
      })

      it('can delete its own blog', () => {
        cy.contains('second blog').parent().find('button').contains('view').click()
        cy.contains('second blog').parent().find('button').contains('remove').should('exist').click()
        cy.on('window:alert', (message) => {
            expect(message).to.contains('Remove blog second blog by cypress')
        })
        cy.contains('second blog').should('not.exist')
      })

      it('can view the remove button', () => {
        cy.contains('second blog').parent().find('button').contains('view').click()
        cy.contains('second blog').parent().find('button').contains('remove').should('exist')
      })
    })

    describe('when sorting blogs', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress',
          url: 'http://cypressblogs.com'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'cypress',
          url: 'http://cypressblogs.com'
        })
        cy.createBlog({
          title: 'third blog',
          author: 'cypress',
          url: 'http://cypressblogs.com'
        })
      })

      it('should sort the blog with most likes to top', () => {
        cy.contains('second blog').parent().find('button').contains('view').click()
        cy.contains('second blog').parent().find('button').contains('like').should('exist').click()
        cy.get('.likes').then((likesDiv) => {
          const likes = likesDiv.text()
          cy.get('.likes').should('contain.text', `Likes ${Number((likes[6] + 1).toString())}` )
        })
        cy.get('.blogs').first().should('contain.text', 'second blog')
      })
    })
    
  })
  
})