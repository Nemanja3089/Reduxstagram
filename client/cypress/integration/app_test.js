describe('Testing Reduxtagram', function(){
  beforeEach(function(){
    cy.visit('/')
  })

  context('Checking titles and <h1>', function(){
     it('Config viewport', function(){
       cy.viewport(650,800)
     })
     it('Check title', function(){
       cy.title().should('be.eq','Reduxstagram')
     })
     it('Check <h1>', function(){
       cy
       .get('h1').find('a').should('contain','Reduxstagram')
       .and('have.attr', 'href').and('not.include','#')
     })
  })

  context('Checking elements visible', function(){
     it('Check figure element', function(){
       cy
       .get('figure').should('be.visible').and('have.class','grid-figure')
       .find('a').first().and('have.attr','href').and('not.include','#')
       .get('figure').first().click()
       .get('.grid-photo-wrap').should('be.visible').invoke('hide')
       .should('not.be.visible')
     })
     it('Check the contents of the text', function(){
       cy
       .get('figcaption').first().find('p')
       .should(function($p){
         var texts = $p.map(function(i, el){
          return Cypress.$(el).text()
         })
         var texts = texts.get()
         expect(texts).to.have.length(1)
         expect(texts).to.deep.eq([
          'Lunch #hamont'
         ])
       })
     })

     it('Check the context of the comments', function(){
       cy
       .get('figure').first().click()
       .get('.comments').find('p')
       .should(function($p){
         var texts = $p.map(function(i, el){
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

     it('Make new comment and check it', function(){
       cy
       .get('.button:first').click()
       .get('.comment-form').find('input:last').should('be.hidden')
       .get('input[type=text]').first().type('John').should('have.value','John')
       .get('input[type=text]').last().type('my comment :)').should('have.value','my comment :)')
       .type('{enter}')
       .get('.comments').find('p')
       .should(function($p){
         var texts = $p.map(function(i, el){
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
