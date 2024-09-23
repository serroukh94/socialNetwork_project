describe("home page", () => {
  it("L'élément h1 comporte la phrase correspondante", () => {
    cy.visit("http://192.168.190.136:8080/");
    cy.get("h1").contains("Bienvenue sur l'application");
  });
});
