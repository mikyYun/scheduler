describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit('/');
    cy.contains("li", "Monday"); // 'Monday' exist in DOM ??
  });

  it("should block an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid='student-name-input']")
      .type("Lydia Miller-Jones")
      .get("[alt='Sylvia Palmer']")
      .click()
      .get(".button--confirm")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains(".appointment__card--show", "Sylvia Palmer")
  })

  it("should edit an interview", () => {
    cy.get("[alt='Edit']")
      .first()
      // .invoke('show').click()
      .click({force: true})
      .get("[data-testid='student-name-input']")
      .clear()
      .type("Tom")
      .get("[alt='Tori Malcolm']")
      .click()
      .get(".button--confirm")
      .click();

  })

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true })
      .get(".button--danger")
      .contains("Confirm")
      .click();

    cy.get(".schedule")
      .contains("DELETING").should("exist")
      .contains("DELETING").should("be.visible")
      .contains("DELETING").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});