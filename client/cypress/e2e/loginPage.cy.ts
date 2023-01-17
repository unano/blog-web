
const real_email = "test@gmail.com";

describe("Login page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
  });
  describe("Navigates tests", () => {
    it("should navigates to login page", () => {
      cy.url().should("include", "/login");
    });
    it("should navigates to register page", () => {
      cy.contains("Register Now").click();
      cy.url().should("include", "/register");
    });
  });
  describe("Invalid inputs tests", () => {
    it("should fail with wrong email", () => {
      cy.get("#account").type("fake@email.com");
      cy.get("#password").type("12345");
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("have.text", "This account dose not exists");
    });
    it("should fail with wrong password", () => {
      cy.get("#account").type(real_email);
      cy.get("#password").type("12345");
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("have.text", "password is incorrect");
    });
  });
  describe("Success login test", () => {
    it("should succes with corrent input", () => {
      cy.get("#account").type(real_email);
      cy.get("#password").type("123456");
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Success");
      cy.get(".toast_title").next().should("have.text", "Login Success");
      cy.url().should("equal", "http://localhost:3000/");
    });
  });
});

export {};