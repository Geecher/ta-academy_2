import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Header extends Component {
    protected LOCATORS = {
        myAccount: this.locator.locator('//button[contains(., "My Account")]'),
        createAcc: this.locator.locator('//a[contains(., "Create Account")]'),
    };

    public async getSignUp(): Promise<void> {
        await this.LOCATORS.myAccount.hover();
        return await this.LOCATORS.createAcc.click();
    }
}
