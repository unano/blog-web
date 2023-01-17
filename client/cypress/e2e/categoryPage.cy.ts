
const category_name1 = "javascript";
const category_name2 = "java";

describe("Category page tests", () => {
  beforeEach(() => {
    cy.adminLogin();
    cy.contains("Category").click();
  });
  describe("Navigates tests", () => {
    it("should navigates to category page", () => {
      cy.url().should("include", "/category");
    });
  });
  describe("Create category func test", () => {
    it("should succesfully create new category", () => {
      cy.get("form input").type(category_name1);
      cy.get("button[type=submit]").click();
      cy.get(".category").eq(0).should("have.text", category_name1);
    });
  });
  describe("Modify category func test", () => {
    it("should succesfully modify category", () => {
      cy.get("form input").type(category_name1);
      cy.get(".category_edit").eq(0).click();
      cy.get("form input").clear().type(category_name2);
      cy.get("button[type=submit]").click();
      cy.get(".category").eq(0).should("have.text", category_name2);
    });
  });
  describe("Delete category func test", () => {
    it("should succesfully delete category", () => {
      cy.get(".category_delete").eq(0).click();
      cy.get(".category").its("length").should("eq", 2);
    });
  });
  describe("Invalid input test", () => {
    it("should show error with duplicate category", () => {
      cy.get("form input").type(category_name1);
      cy.get("button[type=submit]").click();
      cy.get("form input").type(category_name1);
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("have.text", `${category_name1} already exists`);
    });
  });
});

export {};
