describe('Reduxtagram', () => {
  beforeEach(() => {
    cy
    .visit('/')
    .viewport(650,800)
  })

  context('When user lowers screen width', () => {
     it('Displays correct titles and headers', () => {
       cy.title().should('be.eq','Reduxstagram')
     })
     it('Check main page title', () => {
       cy
       .get('h1').find('a').should('contain','Reduxstagram')
       .and('have.attr', 'href').and('not.include','#')
     })
  })

  context('Checking elements visible', () => {
     it('Displays an invisible figure element', () => {
       cy
       .get('figure').should('be.visible').and('have.class','grid-figure')
       .find('a').first().and('have.attr','href').and('not.include','#')
       .get('figure').first().click()
       .get('.grid-photo-wrap').should('be.visible').invoke('hide')
       .should('not.be.visible')
     })
     it('Check the contents of the text', () => {
       cy
       .get('figcaption').first().find('p')
       .should(($p) => {
         var texts = $p.map((i, el) => {
          return Cypress.$(el).text()
         })
         var texts = texts.get()
         expect(texts).to.have.length(1)
         expect(texts).to.deep.eq([
          'Lunch #hamont'
         ])
       })
     })

     it('Check the context of the comments', () => {
       cy
       .get('figure').first().click()
       .get('.comments').find('p')
       .should(function($p){
         var texts = $p.map((i, el) => {
          return Cypress.$(el).text()
         })
         var texts = texts.get()
         expect(texts).to.have.length(4)
         expect('strong').to.exist
         expect('button').to.exist
         expect(texts).to.deep.eq([
          'jdaveknoxWes. WE should have lunch.×',
          'jdaveknox#adults×',
          'wesbos@jdaveknox yes!×',
          'willowtreemegs😍 love Hamilton!×'
         ])
       })
     })

     it('Make new comment and check it', () => {
       cy
       .get('.button:first').click()
       .get('.comment-form').find('input:last').should('be.hidden')
       .get('input[type=text]').first().type('John').should('have.value','John')
       .get('input[type=text]').last().type('my comment :)').should('have.value','my comment :)')
       .type('{enter}')
       .get('.comments').find('p')
       .should(($p) => {
         var texts = $p.map((i, el) => {
          return Cypress.$(el).text()
         })
         var texts = texts.get()
         expect(texts).to.have.length(5)
         expect('strong').to.exist
         expect('button').to.exist
         expect(texts).to.deep.eq([
          'jdaveknoxWes. WE should have lunch.×',
          'jdaveknox#adults×',
          'wesbos@jdaveknox yes!×',
          'willowtreemegs😍 love Hamilton!×',
          'Johnmy comment :)×'
         ])
       })
       .get('.comment-count').should('contain','5')
     })
  })
})
