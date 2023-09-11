import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Header extends Component {
    protected LOCATORS = {
        wishList: this.locator.locator('//li[@data-test-name="itemMyPicks"]//div[@data-productid]'),
        wishBtn: this.locator.locator('//button//div[@aria-label="View My Picks"]'),
        myAccToolip: this.locator.locator('//button[contains(., "My Account")]'),
        createAcc: this.locator.locator('//a[contains(., "Create Account")]'),
    };

    public async getSignUp(): Promise<void> {
        await this.LOCATORS.myAccToolip.hover();
        await this.LOCATORS.createAcc.click();
    }

    public async getWishList(): Promise<Locator[]> {
        await this.LOCATORS.wishBtn.click();
        await this.page.waitForTimeout(2000);
        return await this.LOCATORS.wishList.all();
    }
}
