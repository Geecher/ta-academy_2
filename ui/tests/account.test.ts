import { test, expect } from '@Test';

test.describe('create account and change his data', () => {
    test('open the sign up modal, create account and change First Name and Last Name', async ({
        page,
        baseURL,
        homePage,
        accountPage,
        dataLayer,
    }) => {
        await homePage.open();

        await test.step('hover on my account, click create and create account', async () => {
            await homePage.Header.getSignUp();
            await homePage.ModalSignUp.createAccount();
        });

        await test.step('event should fire after create account', async () => {
            const expectedEvent = {
                event: 'GeneralNonInteraction',
                eventCategory: 'Login',
                eventLabel: 'Registered - Email',
                eventAction: 'Login Status',
            };

            await expect(async () => {
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'GeneralNonInteraction',
                    eventCategory: 'Login',
                    eventLabel: 'Registered - Email',
                    eventAction: 'Login Status',
                });

                expect(event).toStrictEqual(expectedEvent);
            }).toPass();
        });

        await accountPage.open();

        await test.step('edit my details and save changes', async () => {
            await accountPage.editMyDetails();
        });
    });
});
