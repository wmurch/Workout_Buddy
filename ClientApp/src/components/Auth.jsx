class Auth {
  constructor() {
    this.authenticated = false
  }

  login(cb) {
    this.authenticated = true
    cb()
    console.log('login status' + this.authenticated)
  }

  logout(cb) {
    this.authenticated = false
    cb()
  }

  isAuthenticated() {
    console.log('check status' + this.authenticated)
    return this.authenticated
  }
}

export default new Auth()
