import { test, expect } from '@Test';

test.describe('add first glass to favourites on Sunglasses page', () => {
    test('add to wishlist and check', async ({ page, baseURL, categoryPage, dataLayer }) => {
        await categoryPage.open('sunglasses');

        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}sunglasses`);
        });

        const [product] = await categoryPage.getProducts();
        const productId = await product.getAttribute('data-test-id');

        await test.step('find first glass, click "My pick" and check this', async () => {
            const myPick = await product.locator('[data-testid="myPickWrapper"]');
            await myPick.click();
            const attrValue = await myPick.getAttribute('data-test-active');

            expect(attrValue).toBe('true');

            const expectedEvent = {
                event: 'CategoryInteraction',
                eventAction: 'Product',
                eventCategory: 'Category - D',
                eventLabel: 'Add to Wishlist',
            };

            await expect(async () => {
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'CategoryInteraction',
                    eventAction: 'Product',
                    eventLabel: 'Add to Wishlist',
                    eventCategory: 'Category - D',
                });

                expect(event).toStrictEqual(expectedEvent);
            }).toPass();
        });

        await test.step('click wishlist button and check the product list', async () => {
            const [wishList] = await categoryPage.Header.getWishList();
            const itemId = await wishList.getAttribute('data-productid');

            expect(itemId).toBe(productId);
        });
    });
});
