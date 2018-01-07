import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Customers e2e test', () => {

    let navBarPage: NavBarPage;
    let customersDialogPage: CustomersDialogPage;
    let customersComponentsPage: CustomersComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customers');
        customersComponentsPage = new CustomersComponentsPage();
        expect(customersComponentsPage.getTitle())
            .toMatch(/gatewayuaaApp.customers.home.title/);

    });

    it('should load create Customers dialog', () => {
        customersComponentsPage.clickOnCreateButton();
        customersDialogPage = new CustomersDialogPage();
        expect(customersDialogPage.getModalTitle())
            .toMatch(/gatewayuaaApp.customers.home.createOrEditLabel/);
        customersDialogPage.close();
    });

    it('should create and save Customers', () => {
        customersComponentsPage.clickOnCreateButton();
        customersDialogPage.setEmailInput('email');
        expect(customersDialogPage.getEmailInput()).toMatch('email');
        customersDialogPage.setPasswordInput('password');
        expect(customersDialogPage.getPasswordInput()).toMatch('password');
        customersDialogPage.save();
        expect(customersDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomersComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customers div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomersDialogPage {
    modalTitle = element(by.css('h4#myCustomersLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    emailInput = element(by.css('input#field_email'));
    passwordInput = element(by.css('input#field_password'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setPasswordInput = function(password) {
        this.passwordInput.sendKeys(password);
    }

    getPasswordInput = function() {
        return this.passwordInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
