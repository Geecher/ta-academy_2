import { FeaturedIn } from '@Components/featuredIn';
import { FooterSub } from '@Components/footerSub';
import { Header } from '@Components/header';
import { ModalSignUp } from '@Components/modalSignUp';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[@id="page-header"]'),
        footerSub: this.page.locator('//footer//div[contains(., "Join our newsletter")]').first(),
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        modalSignUp: this.page.locator('//form[@id="form-popup-register"]'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public Header = new Header(this.LOCATORS.header, this.page);
    public ModalSignUp = new ModalSignUp(this.LOCATORS.modalSignUp, this.page);
    public FooterSub = new FooterSub(this.LOCATORS.footerSub, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
