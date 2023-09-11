import { Component } from '@Core/component';
import { faker } from '@faker-js/faker';

export class ModalSignUp extends Component {
    protected LOCATORS = {
        email: this.locator.locator('//input[@type="email"]'),
        firstName: this.locator.locator('//input[@name="firstName"]'),
        lastName: this.locator.locator('//input[@name="lastName"]'),
        password: this.locator.locator('//input[@name="password"]'),
        submit: this.locator.locator('//button[@type="submit"]'),
    };

    public async createAccount(): Promise<void> {
        await this.LOCATORS.email.fill(faker.internet.email());
        await this.LOCATORS.submit.click();

        await this.LOCATORS.firstName.fill(faker.person.firstName());
        await this.LOCATORS.lastName.fill(faker.person.lastName());
        await this.LOCATORS.password.fill(faker.internet.password());
        await this.LOCATORS.submit.click();
    }
}
