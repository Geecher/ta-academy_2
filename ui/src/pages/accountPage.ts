import { Container } from '@Core/container';
import { faker } from '@faker-js/faker';
import type { Locator } from '@playwright/test';
import { expect } from '@Test';

export class AccountPage extends Container {
    protected LOCATORS = {
        myDetails: this.page.locator('//a[@data-id="myDetails"]'),
        edit: this.page.locator('//button[contains(., "Edit Information")]'),
        firstName: this.page.locator('//input[@placeholder="First Name"]'),
        save: this.page.locator('//button[contains(., "Save")]'),
    };

    public async open(): Promise<void> {
        await this.page.goto('/customer/account', { waitUntil: 'domcontentloaded' });
    }

    public async editMyDetails(): Promise<void> {
        await this.LOCATORS.myDetails.click();
        await this.LOCATORS.edit.click();

        const name = faker.person.firstName();
        await this.LOCATORS.firstName.fill(name);
        await this.LOCATORS.save.click();

        expect(this.LOCATORS.firstName).toHaveValue(name);
    }
}
