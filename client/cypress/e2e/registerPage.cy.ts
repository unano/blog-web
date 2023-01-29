
const invalid_email = "testgmail.com";
const valid_email = "romanroll997@gmail.com";/* add a valid email when you want to test.
Add an valid email that not belongs to you may affect other people,
so please don't do so.
*/
const valid_password1 = "123456";
const valid_password2 = "1234567";
const invalid_password = "12345";

describe("Register page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Register").click();
  });
  describe("Navigates tests", () => {
    it("should navigates to register page", () => {
      cy.url().should("include", "/register");
    });
    it("should navigates to login page", () => {
      cy.contains("Already have an account? ").next().next().click();
      cy.url().should("include", "/login");
    });
  });
  describe("Invalid inputs tests", () => {
    it("should fail register with no input", () => {
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
    });
    it("should fail register with invalid email", () => {
      cy.get("#name").type("12");
      cy.get("#account").type(invalid_email);
      cy.get("#password").type(valid_password1);
      cy.get("#cf_password").type(valid_password1);
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("have.text", "Email format incorrect");
    });
    it("should fail register with invalid password", () => {
      cy.get("#name").type("12");
      cy.get("#account").type(valid_email);
      cy.get("#password").type(invalid_password);
      cy.get("#cf_password").type(invalid_password);
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("have.text", "Password must be at least 6 chars");
    });
    it("should fail register with inconsistent password", () => {
      cy.get("#name").type("12");
      cy.get("#account").type(valid_email);
      cy.get("#password").type(valid_password1);
      cy.get("#cf_password").type(valid_password2);
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("have.text", "Confirm password did not match");
    });
    it("should fail register with registered email", () => {
      cy.get("#name").type("12");
      cy.get("#account").type("test@gmail.com");
      cy.get("#password").type(valid_password1);
      cy.get("#cf_password").type(valid_password1);
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title").next().should("have.text", "Email already exists");
    });
  });
  describe("Success test ", () => {
    it("should register successfully", () => {
      cy.get("#name").type("12");
      cy.get("#account").type(valid_email);
      cy.get("#password").type(valid_password1);
      cy.get("#cf_password").type(valid_password1);
      cy.get("button[type=submit]").click();
      cy.get(".toast_title").should("have.text", "Success");
      cy.get(".toast_title")
        .next()
        .should("have.text", "Success! Plese check your email");
    });
  });
});

export {};
