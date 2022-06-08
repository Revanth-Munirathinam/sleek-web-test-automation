const { Given, When, Then } = require('@wdio/cucumber-framework');
const { async } = require('../pageobjects/HomePage');

const HomePage = require('../pageobjects/HomePage');
var config = require('./../../wdio.conf.js').config;

const pages = {
    home: HomePage
}

Given('I went to the Sleek SG {string} page', async (page) => {
    await browser.url(config.baseUrl);
    browser.maximizeWindow();
    await HomePage.waitForHomePageLoad();
});

Given('I am on the Sleek SG {string} page', async (page) => {
    await HomePage.waitForHomePageLoad();
    await HomePage.validatePageLoaded(page);
});

When('I click on the {string} link', async (page) => {
    await HomePage.clickElement(page);
});

Then('I should be navigated to the Sleek SG {string} page', async (page) => {
    await HomePage.waitForHomePageLoad();
    await HomePage.validatePageLoaded(page);
});

Then('Verify corporate secretary details are correct: {string} {string}', async (numberOfShares, price) => {
    await HomePage.selectAndValidateShareDetails(numberOfShares, price);
});