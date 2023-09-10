import { Header } from '@Components/header';
import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[@id="page-header"]'),
        product: this.page.locator('[data-test-name="product"]'),
        footer: this.page.locator('//footer[contains(., "Live Chat" )]'),
    };

    public Header = new Header(this.LOCATORS.header, this.page);

    public async open(
        url: 'contact-lenses' | 'sunglasses' | 'eyeglasses-collection'
    ): Promise<void> {
        await this.page.goto(`/${url}`, { waitUntil: 'domcontentloaded' });
    }

    public async scrollProducts(): Promise<void> {
        await this.LOCATORS.footer.scrollIntoViewIfNeeded();
    }

    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.product.all();
    }
}
