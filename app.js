import puppeteer from "puppeteer-core"
import { executablePath } from "puppeteer"

const screenshot = async (url) => {
	const browser = await puppeteer.launch({ executablePath: executablePath() })
	const page = await browser.newPage()
	page.setViewport({ width: 1600, height: 900 })
	await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })
	const pageSize = await page.evaluate(() => {
		return {
			width: window.document.body.scrollWidth,
			height: window.document.body.scrollHeight
		}
	})
	page.setViewport(pageSize)
	await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })
	await page.screenshot({ path: "example.png" })
	await browser.close()
}

screenshot("")
