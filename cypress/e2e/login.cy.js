/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  /**
   * Skenario 1
   */
  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  /**
   * Skenario 2
   */
  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  /**
   * Skenario 3
   */
  it('should display alert when password is empty', () => {
    // mengisi username
    cy.get('input[type="email"]').type('lorem12345@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  /**
   * Skenario 4
   */
  it('should display alert when username and password are wrong', () => {
    // mengisi email
    cy.get('input[type="email"]').type('testuser@gmail.com');

    // mengisi password yang salah
    cy.get('input[type="password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  /**
   * Skenario 5
   */
  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="Email"]').type('testuser');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('test123456');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav').contains(/^DICODING FORUM APP$/).should('be.visible');
    cy.get('main').should('be.visible');
  });
});
