const { Loginpage } = require("./Loginpage")

class POManager {


    constructor(page) {

        this.page = page
        this.loginPage = new Loginpage(this.page)


    }

    getLoginPage() {
        return this.loginPage
    }
}

module.exports = { POManager }