const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

const BASE_URL = process.env.TEST_URL || 'http://127.0.0.1:4173/Aegis_web';
const EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com';
const PASSWORD = process.env.TEST_USER_PASSWORD || 'password123';
const SELENIUM_SERVER_URL = process.env.SELENIUM_SERVER_URL;

describe('Aegis Web login flow', function () {
  this.timeout(120000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    if (process.env.CI) {
      options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
    }
    const builder = new Builder().forBrowser('chrome').setChromeOptions(options);
    if (SELENIUM_SERVER_URL) {
      builder.usingServer(SELENIUM_SERVER_URL);
    }
    driver = await builder.build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should visit auth page and login successfully', async function () {
    await driver.get(`${BASE_URL}/auth`);
    await driver.findElement(By.id('auth-email')).sendKeys(EMAIL);
    await driver.findElement(By.id('auth-password')).sendKeys(PASSWORD);
    await driver.findElement(By.id('auth-submit')).click();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('/dashboard');
    }, 20000);

    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/dashboard'), 'Expected to be redirected to dashboard');
  });
});
