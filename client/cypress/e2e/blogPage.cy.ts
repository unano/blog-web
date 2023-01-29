

describe("Blog page tests", () => {
  beforeEach(() => {
    cy.adminLogin();
  });
  describe("comment operations", () => {
    it("should successfully comment", () => {
      cy.createBlog();
      cy.wait(2000);
      cy.get(".shown_title").eq(0).click();
      cy.get(".ql-editor").type("good");
      cy.get(".make_comment button").contains("Send").click();
      cy.get(".info + div").eq(0).should("contain", "good");
    });
    it("should successfully reply comment", () => {
      cy.get(".card_title").eq(0).click();
      cy.get(".reply").click();
      cy.get(".ql-editor").eq(1).type("good!!");
      cy.get(".make_comment")
        .eq(1)
        .within(($form) => {
          cy.get("button").contains("Send").eq(0).click();
        });
      cy.get(".blog_outer .blog_outer")
        .eq(0)
        .within(($form) => {
          cy.get(".info + div").eq(0).should("contain", "good!!");
        });
    });
  });
  describe("thumb operations", () => {
    it("should successfully thumb", () => {
      cy.get(".card_title").eq(0).click();
      cy.get(".comment_thumbs .thumbing").eq(0).click();
      cy.get(".comment_thumbs .count").eq(0).should("contain", "1");
    });
    it("should successfully unthumb", () => {
      cy.get(".card_title").eq(0).click();
      cy.get(".comment_thumbs .thumbing").eq(0).click();
      cy.get(".comment_thumbs .count").eq(0).should("contain", "0");

      //delete the blog after test
      cy.get(".dropdown").click();
      cy.get(".dropdown_item").eq(0).click();
      cy.get(".delete").eq(0).click();
      cy.on("window: confirm", () => true);
    });
  });
});

export {};
