import { FeaturedIn } from '@Components/featuredIn';
import { Header } from '@Components/header';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[@id="page-header"]'),
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public Header = new Header(this.LOCATORS.header, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
