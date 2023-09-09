import { test, expect } from '@Test';

// test.use({ trace: 'on' });
test.describe('create account and change his data', () => {
    test('open the sign up modal, create account and change First Name and Last Name', async ({
        page,
        baseURL,
        homePage,
    }) => {
        await homePage.open();

        await test.step('hover on my account, click create and fil the email', async () => {
            await homePage.Header.getSignUp();

            await page.waitForTimeout(1000);

            // await expect(async () => {
            //     const products = await categoryPage.getProducts();
            //     expect(products.length).toBe(36);
            // }).toPass();
        });
    });
});
