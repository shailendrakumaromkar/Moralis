class Loginpage {

    constructor(page) {
        this.page = page;
        this.email = page.locator("#admin-login-email")
        this.password = page.locator("span[title='Password']")
        this.logInBtn = page.locator("[type='submit']")

    }


    async login(email, password) {
        await this.email.fill(email)
        await this.page.waitForTimeout(2000);
        await this.password.fill(password)
        await this.page.waitForTimeout(2000);
        await this.logInBtn.click();
        await this.page.waitForTimeout(2000);
       
    }


}

module.exports = { Loginpage }