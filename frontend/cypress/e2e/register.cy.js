describe("home page", () => {
  it("Formulaire d'inscription", () => {
    cy.visit("http://192.168.190.136:8080/register");
    cy.get(".form-group").eq(0);
  });
});
