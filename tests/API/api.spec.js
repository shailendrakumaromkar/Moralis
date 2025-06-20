const { test, expect, request } = require('@playwright/test');
const { z } = require('zod')
const dotenv = require('dotenv');
dotenv.config({ path: '././env/.env.prod' })

const testData = require('../../testData/API/api_Endpoint.json')
const API_Key = process.env.API_Key
const Base_URL = process.env.BASE_URL
const nftWalletAddress = testData.NFT_WALLET_ADDRESS

let response;
let responseData;
let requestContext
test.beforeAll("Run getWalletNFTs endpoint and save response", async () => {
  requestContext = await request.newContext()

  response = await requestContext.get(`${Base_URL}/api/v2.2/${nftWalletAddress}/nft?chain=eth&format=decimal&exclude_spam=false&normalizeMetadata=true&media_items=false&include_prices=false`,
    {
      headers: {
        "X-API-Key": API_Key,
        "content-type": "application/json"
      }
    }
  )
  responseData = await response.json()
})

test("verify getWalletNFts endpoint - status code, status message", async () => {
  expect(response.status()).toBe(200)
  expect(response.statusText()).toBe("OK")
})

test("verify getWalletNFts endpoint- top level field data", async () => {
  expect(responseData.status).toBe("SYNCED")
  expect(responseData.page).toBe(1)
  expect(responseData.page_size).toBe(100)
  // expect(responseData.cursor).toBe(null)
  expect(responseData.result).toBeInstanceOf(Array)
  expect(responseData.cursor).toBeTruthy()
  expect(responseData.cursor.length).toBeGreaterThan(0)
})

test("verify getWalletNFts endpoint- result array data", async () => {
  expect(responseData.result[0].owner_of).toContain(nftWalletAddress.toLowerCase())
})

test("verify getWalletNFts endpoint - cursor and next page data", async () => {
  const nextPage = responseData.cursor
  const nextPageResponse = await requestContext.get(
    `${Base_URL}/api/v2.2/${nftWalletAddress}/nft?chain=eth&format=decimal&exclude_spam=false&cursor=${nextPage}&normalizeMetadata=true&media_items=false&include_prices=false`,
    {
      headers: {
        "X-API-Key": API_Key,
        "content-type": "application/json"
      }
    }
  )

  const nextPageResponseData = await nextPageResponse.json()
  expect(nextPageResponseData.page).toBe(2)
  expect(nextPageResponseData.result[0].owner_of).toContain(nftWalletAddress.toLocaleLowerCase())
})


