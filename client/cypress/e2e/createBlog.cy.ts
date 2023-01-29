
const valid_title = "1234567";
const invalid_title = "1234";

const valid_description = "123456789101111212121212";
const invalid_description = "1234";

const valid_content = `123456asdasdasdasdasdasdassdfdsfdsf
asdasdasdasdasdasdsdfdsfdsfdsfdsfdsfdsfdsfdsfdsfsdf
sdfdsfsdfdsfdsfsdfsdfdsfdsfsdfdsfdsfsdfsdfdsf
dsfdsfdsfdsfdsfsdfsdfdsfdsfdsfsdfsdfdsfdsf
asdasdasdasdasdasdasd789101111212121212`;

const invalid_content = "1234";

describe("Create blog page tests", () => {
  beforeEach(() => {
    cy.adminLogin();
    cy.contains("CreateBlog").click();
  });
  describe("Navigates tests", () => {
    it("should navigates to create blog page", () => {
      cy.url().should("include", "/create_blog");
    });
  });
  describe("Invalid inputs tests", () => {
    it("should fail with corresponding lacking input", () => {
      cy.contains("Create Post").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("contain.text", "Title should have at least 5 characters")
        .should("contain.text", "Content should have at least 100 characters")
        .should(
          "contain.text",
          "Description should have at least 10 characters"
        )
        .should("contain.text", "Thumbnail cannot be blank")
        .should("contain.text", "Category cannot be blank");
    });
    it("should fail with short title", () => {
      cy.get("input[name=title]").type(invalid_title);
      cy.contains("Create Post").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("contain.text", "Title should have at least 5 characters");
    });
    it("should fail with short content", () => {
      cy.get(".ql-editor").type(invalid_content);
      cy.contains("Create Post").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should("contain.text", "Content should have at least 100 characters");
    });

    it("should fail with short description", () => {
      cy.get("textarea").type(invalid_description);
      cy.contains("Create Post").click();
      cy.get(".toast_title").should("have.text", "Errors");
      cy.get(".toast_title")
        .next()
        .should(
          "contain.text",
          "Description should have at least 10 characters"
        );
    });
  });
  describe("Success create blog test", () => {
    it("should succeed with valid input", () => {
      cy.get("input[name=title]").type(valid_title);
      cy.get("textarea").type(valid_description);
      cy.get(".ql-editor").type(" ");
      cy.get(".ql-editor").type(valid_content);
      cy.wait(500);
      cy.get("select[name=category]").select("test");
      cy.contains("Upload File").selectFile("cypress/test_resources/test.jpg");
      cy.contains("Create Post").click();
      cy.wait(1000);
      cy.get(".toast_title").should("have.text", "Success");
      cy.get(".toast_title").next().should("have.text", "Upload Success");
    });
  });
});

export {};
