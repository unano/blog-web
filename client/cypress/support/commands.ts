
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      adminLogin(): Chainable<Element>;
    }
    interface Chainable<Subject> {
        adminLoginOptional(input:string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("adminLogin", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.get("#account").type("test@gmail.com");
    cy.get("#password").type("123456");
    cy.get("button[type=submit]").click();
    cy.get(".toast_close").click();
});

Cypress.Commands.add("adminLoginOptional", (input) => {
  cy.visit("http://localhost:3000");
  cy.contains("Login").click();
  cy.get("#account").type("test@gmail.com");
  cy.get("#password").type(input);
  cy.get("button[type=submit]").click();
  cy.get(".toast_close").click();
});

export {}