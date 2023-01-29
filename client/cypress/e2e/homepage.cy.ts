

describe("Home page tests", () => {
  beforeEach(() => {
    cy.adminLogin();
  });
  // describe("Navigates tests", () => {
  //   it("should navigates to home page", () => {
  //     cy.url().should("not.include", "/");
  //   });
  // });
  describe("Home page test", () => {
    it("should succesfully show categories", () => {
      cy.createBlog();
      cy.contains("Home").click();
      cy.get(".open_close").click();
      cy.get(".home_categories_list").should("contain", "spring");
    });
    it("should succesfully navigates", () => {
      cy.contains("test").click();
      cy.url().should("contain", "/blogs/test");
    });
  });
  describe("Blog test", () => {
    it("should succesfully show categories", () => {
      cy.createBlog();
      cy.contains("Home").click();
      cy.get(".head > a").click();
      cy.get(".card_vert")
        .eq(0)
        .get(".card_title")
        .should("contain", "UNDERCOVER");
      //delete the blog after test
      cy.get(".dropdown").click();
      cy.get(".dropdown_item").eq(0).click();
      cy.get(".delete").eq(0).click();
      cy.on("window: confirm", () => true);
    });
  });
});

export {};
