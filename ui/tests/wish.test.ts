import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('add first glass to favourites on Sunglasses page', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });
    test('add to wishlist and check', async ({ page, baseURL }) => {
        const sunglasses = page.locator('//nav//a[contains(., "Sunglasses")]');

        await sunglasses.click();
        await page.waitForLoadState('load');

        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}sunglasses`);
        });

        const product = await page.locator('[data-test-name="product"]').first();
        const productId = await product.getAttribute('data-test-id');

        await test.step('find first glass, click "My pick" and check this', async () => {
            const dataLayer = new DataLayer(page);
            const expectedEvent = {
                event: 'CategoryInteraction',
                eventAction: 'Product',
                eventCategory: 'Category - D',
                eventLabel: 'Add to Wishlist',
            };
            const myPick = await product.locator('[data-testid="myPickWrapper"]');

            await myPick.click();
            await page.waitForTimeout(1000);
            const [event] = await dataLayer.waitForDataLayer({
                event: 'CategoryInteraction',
                eventAction: 'Product',
                eventLabel: 'Add to Wishlist',
                eventCategory: 'Category - D',
            });

            expect(event).toStrictEqual(expectedEvent);
        });

        await test.step('click wishlist button and check the product list', async () => {
            const wishBtn = await page.locator(
                '//header//button//div[@aria-label="View My Picks"]'
            );
            await wishBtn.click();

            const itemId = await page
                .locator('//ul//li//div[@data-productid]')
                .getAttribute('data-productid');

            expect(itemId).toStrictEqual(productId);
        });
    });
});
