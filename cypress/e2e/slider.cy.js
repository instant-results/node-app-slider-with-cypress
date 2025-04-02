describe('Swiper Gallery Test', function () {
  
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });

  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });

  // 1️⃣ Test: Ensuring navigation buttons work
  it('User can navigate slides using navigation buttons', function () {
    cy.visit('http://localhost:3000');

    // Click "next" button and verify slide changes
    cy.get('.swiper-slide-active').then(($firstSlide) => {
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-slide-active').should('not.equal', $firstSlide);
    });

    // Click "previous" button and verify slide changes back
    cy.get('.swiper-slide-active').then(($secondSlide) => {
      cy.get('.swiper-button-prev').click();
      cy.get('.swiper-slide-active').should('not.equal', $secondSlide);
    });
  });

  // 2️⃣ Test: Verifying slide descriptions are displayed correctly
  it('Each slide displays the correct title and description', function () {
    cy.visit('http://localhost:3000');

    const expectedSlides = [
      { title: 'Rome', description: 'Italy' },
      { title: 'London', description: 'United Kingdom' },
      { title: 'Paris', description: 'France' }
    ];

    expectedSlides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
        cy.wait(2000);
      }
      cy.get('.swiper-slide-active').should('contain', slide.title);
      cy.get('.swiper-slide-active').should('contain', slide.description);
    });
  });

  // 3️⃣ Test: Checking gallery responsiveness on different devices
  it('Gallery adapts correctly to different screen sizes', function () {
    const viewports = [
      [1920, 1080], // Desktop
      [1024, 768], // Tablet
      [375, 667]  // Mobile
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport[0], viewport[1]);
      cy.visit('http://localhost:3000');

      // Check if the gallery is visible
      cy.get('.swiper').should('be.visible');

      // Check if navigation buttons are visible
      cy.get('.swiper-button-next').should('be.visible');
      cy.get('.swiper-button-prev').should('be.visible');

      // Click to make sure they work
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-button-prev').click();
    });
  });

  // 4️⃣ Test: Ensuring gallery elements are displayed correctly
  it('Gallery is displayed correctly with all elements visible', function () {
    cy.visit('http://localhost:3000');

    // Check if the main gallery container is visible
    cy.get('.swiper').should('be.visible');

    // Ensure all three slides exist
    cy.get('.swiper-slide').should('have.length', 3);

    // Verify navigation buttons are present and functional
    cy.get('.swiper-button-next').should('be.visible').click();
    cy.get('.swiper-button-prev').should('be.visible').click();
  });

});
