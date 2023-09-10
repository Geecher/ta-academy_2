import { Component } from '@Core/component';
import { faker } from '@faker-js/faker';

export class FooterSub extends Component {
    protected LOCATORS = {
        mailField: this.locator.locator('//input[@placeholder="Enter your Email"]'),
        submitBtn: this.locator.locator('//button[contains(., "Sign Up")]'),
    };

    public async scrollToFooter(): Promise<void> {
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async subscribe(): Promise<void> {
        await this.LOCATORS.mailField.fill(faker.internet.email());
        await this.LOCATORS.submitBtn.click();
    }
}
