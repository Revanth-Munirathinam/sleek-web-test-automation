
const chai = require('chai');
chai.Assertion.addProperty('visible', require('chai-visible'));
const expect = chai.expect;

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage {

    get homePageLogo () {
        return $('//div[@data-id="aab191b"]');
    }

    get pricing() {
        return $('#menu-item-36831')
    }

    get pricingPageText() {
        return $('//h1[text()="Singapore\'s best value for money!"]')
    }

    get corporateSecretaryFindOutMore() {
        return $('[href="/sg/corporate-secretary-singapore/"]')
    }
    get corporateSecretary() {
        return $('//h3[text()="Corporate secretary"]')
    }

    get fixedFee() {
        return $('//h2[text()="Fixed fee. Unlimited service!"]')
    }

    get stepTwo() {
        return $('//div[@id="step2"]')
    }

    get stepTwoSelected() {
        return $('//div[@id="step2"]//div[@class="accounting-bullet selected"]')
    }

    get stepTwoPrice() {
        return $('//div[@data-id="82e3849"]//p[@class="elementor-heading-title elementor-size-default"]')
    }
    get stepFour() {
        return $('#step4')
    }

    get stepFourSelected() {
        return $('//div[@id="step4"]//div[@class="accounting-bullet selected"]')
    }

    get stepFourPrice() {
        return $('//div[@data-id="7a0cfe6"]//p[@class="elementor-heading-title elementor-size-default"]')
    }

    get stepSeven() {
        return $('//div[@id="step7"]')
    }

    get stepSevenSelected() {
        return $('//div[@id="step7"]//div[@class="accounting-bullet selected"]')
    }

    get stepSevenPrice() {
        return $('//div[@data-id="a05d362"]//p[@class="elementor-heading-title elementor-size-default"]')
    }

    get stepTwoPrice() {
        return $('//div[@data-id="82e3849"]//p[@class="elementor-heading-title elementor-size-default"]')
    }

    get pricePerYears() {
        return $('//div[@data-id="2009123"]//p[@class="elementor-heading-title elementor-size-default"]')
    }

    async waitForHomePageLoad() {
        await (await this.homePageLogo).waitForExist();
        expect (await this.homePageLogo).to.exist;
    }

    async clickElement(page) {
        console.log('Page ' + page);
        if (page === "Pricing") {
            await (await this.pricing).waitForExist();
            expect (await this.pricing).to.exist;
            await (await this.pricing).click();
        } else if (page === "Find Out") {
            await (await this.corporateSecretaryFindOutMore).waitForExist();
            expect (await this.corporateSecretaryFindOutMore).to.exist;
            browser.execute("arguments[0].click();", await this.corporateSecretaryFindOutMore);
        }
    }

    async validatePageLoaded(page) {
        if (page === "Pricing") {
            await (await this.pricingPageText).waitForExist();
            expect (await this.pricingPageText).to.exist;
        } 
    }

    async selectAndValidateShareDetails(numberOfShares, price) {
        await (await this.fixedFee).waitForExist();
        expect (await this.fixedFee).to.exist;
        console.log('Number Of shares ' + numberOfShares + " Price " + price);
        if (numberOfShares === "2 Shareholders") {
            await (await this.stepTwo).waitForExist();
            expect (await this.stepTwo).to.exist;
            browser.execute("arguments[0].click();", await this.stepTwo);
            await (await this.stepTwoPrice).waitForExist();
            expect (await this.stepTwoPrice).to.exist;
            console.log('Actual Price displayed ' + (await (await this.stepTwoPrice).getText() + 'Expected Price is ' + price));
            expect (await (await this.stepTwoPrice).getText()).to.equal(price);
            
        } else if (numberOfShares === "6 - 9 Shareholders") {
            await (await this.stepFour).waitForExist();
            expect (await this.stepFour).to.exist;
            browser.execute("arguments[0].click();", await this.stepFour);
            await (await this.stepFourPrice).waitForExist();
            expect (await this.stepFourPrice).to.exist;
            console.log('Actual Text ' + (await (await this.stepFourPrice).getText() + 'Expected Price is ' + price));
            expect (await (await this.stepFourPrice).getText()).to.equal(price);
        } else if (numberOfShares === "> 30 Shareholders") {
            await (await this.stepSeven).waitForExist();
            expect (await this.stepSeven).to.exist;
            browser.execute("arguments[0].click();", await this.stepSeven);

           await (await this.stepSevenPrice).waitForExist();
           expect (await this.stepSevenPrice).to.exist;
           console.log('Actual Text ' + (await (await this.stepSevenPrice).getText() + 'Expected Price is ' + price));
           expect (await (await this.stepSevenPrice).getText()).to.equal(price);
        }

    }
}

module.exports = new HomePage();