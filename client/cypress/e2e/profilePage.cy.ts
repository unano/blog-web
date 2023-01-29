
import { click } from "@testing-library/user-event/dist/click";

const new_password1 = "1234567";
const new_password2 = "123456";
const new_password3 = "12345";
let currentPass = new_password2;

describe("Category page tests", () => {
  beforeEach(() => {
    cy.adminLoginOptional(currentPass);
    cy.get(".dropdown").click();
    cy.get(".dropdown_item").eq(0).click();
  });
  describe("Navigates tests", () => {
    it("should navigates to profile page", () => {
      cy.url().should("include", "/profile");
    });
  });
  describe("Modify profile test", () => {
    describe("Modify password success test", () => {
      it("should succesfully update password(01)", () => {
        cy.get(".pass").eq(0).type(new_password1);
        cy.get(".pass").eq(1).type(new_password1);
        cy.get("button[type=submit]").click();
        currentPass = new_password1;
        cy.get(".toast_title").should("have.text", "Success");
        cy.get(".toast_title")
          .next()
          .should("have.text", "Reset Password Success");
      });
      it("should succesfully update password(02)", () => {
        cy.get(".pass").eq(0).type(new_password2);
        cy.get(".pass").eq(1).type(new_password2);
        cy.get("button[type=submit]").click();
        currentPass = new_password2;
        cy.get(".toast_title").should("have.text", "Success");
        cy.get(".toast_title")
          .next()
          .should("have.text", "Reset Password Success");
      });
    });
    describe("Modify password fail test", () => {
      it("should fail with inconsistent password", () => {
        cy.get(".pass").eq(0).type(new_password2);
        cy.get(".pass").eq(1).type(new_password1);
        cy.get("button[type=submit]").click();
        cy.get(".toast_title").should("have.text", "Errors");
        cy.get(".toast_title")
          .next()
          .should("have.text", "Confirm password did not match");
      });
      it("should fail with invalid password", () => {
        cy.get(".pass").eq(0).type(new_password3);
        cy.get(".pass").eq(1).type(new_password3);
        cy.get("button[type=submit]").click();
        cy.get(".toast_title").should("have.text", "Errors");
        cy.get(".toast_title")
          .next()
          .should("have.text", "Password must be at least 6 chars");
      });
    });
    describe("Modify avatar success test", () => {
      it("should successfully modify avatar", () => {
        cy.get(".user_info > .avatar").trigger("mouseover");
        cy.get("label[for=file_up")
          .click()
          .selectFile("cypress/test_resources/test.jpg");
        cy.get("button[type=submit]").click();
        cy.wait(2000);
        cy.get(".toast_title").should("have.text", "Success");
        cy.get(".toast_title").next().should("have.text", "Update Success");
      });
    });
  });
  describe("Manage blogs", () => {
    it("should successfully modify blogs", () => {
      cy.createBlog();
      cy.get(".modify").eq(0).click();
      cy.wait(2000);
      cy.get("input[name=title]").clear().type("new title");
      cy.get(".create_post button").click();
      cy.get(".shown_title").eq(0).should("contain", "new title");
    });
    it("should successfully delete blogs", () => {
      cy.get(".shown_title").eq(0).should("contain", "new title");
      cy.get(".delete").eq(0).click();
      cy.on("window: confirm", () => true);
      cy.get(".shown_title").eq(0).should("not.contain", "new title");
    });
  });
});

export {};
