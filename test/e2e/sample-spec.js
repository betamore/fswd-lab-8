var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('todo application', function() {
    it('should be running', function() {
        browser.get('http://localhost:8000');
        expect(element(by.tagName('h1')).getText()).to.eventually.equal('Hello world!');
    });

    describe('registration page', function() {
        it('should not allow registrations with mismatched passwords', function() {
            browser.get('http://localhost:8000/users/register');
            element(by.model('$reg.username')).sendKeys('testUser');
            browser.sleep(500);
            element(by.model('$reg.email')).sendKeys('something@fakeemail.com');
            browser.sleep(500);
            element(by.model('$reg.password')).sendKeys('password');
            browser.sleep(500);
            element(by.model('$reg.password_confirm')).sendKeys('password1');
            browser.sleep(500);
            expect(element(by.tagName('button')).isEnabled()).to.eventually.be.false;
        });
        it('should allow registrations with matched passwords', function() {
            browser.get('http://localhost:8000/users/register');
            element(by.model('$reg.username')).sendKeys('testUser');
            browser.sleep(500);
            element(by.model('$reg.email')).sendKeys('something@fakeemail.com');
            browser.sleep(500);
            element(by.model('$reg.password')).sendKeys('password');
            browser.sleep(500);
            element(by.model('$reg.password_confirm')).sendKeys('password');
            browser.sleep(500);
            expect(element(by.tagName('button')).isEnabled()).to.eventually.be.true;
        });
    });
});
