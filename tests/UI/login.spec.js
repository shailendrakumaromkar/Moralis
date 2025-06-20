const { test, expect } = require('@playwright/test')
const { POManager } = require('../../pages/POManager')

const dotenv = require('dotenv')
dotenv.config({ path: '././env/.env.prod' })

//const { Loginpage } = require('../../pages/Loginpage')

test("Moralis UI", async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://admin.moralis.com/login")

    expect(page.url()).toContain("moralis")

    expect(await page.title()).toContain("Moralis for Developers")

})


test("Moralis Login", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://admin.moralis.com/login")

    await page.locator("#admin-login-email").fill(process.env.EMAIL)
    await page.waitForTimeout(2000);
    await page.locator("span[title='Password']").fill(process.env.PASSWORD)
    await page.waitForTimeout(2000);
    await page.locator("[type='submit']").click()
    await page.waitForTimeout(2000);

    await page.pause()

})

test.only("Moralis Login POM without POManager", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const loginpage = new Loginpage(page)

    await page.goto("https://admin.moralis.com/login")

    loginpage.login(process.env.EMAIL, process.env.PASSWORD)
    await page.pause()

})

test("Moralis Login POM", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const poManager = new POManager(page)

    await page.goto("https://admin.moralis.com/login")

    const loginpage = poManager.getLoginPage()
    await loginpage.login(process.env.EMAIL, process.env.PASSWORD)


    await page.pause()

})