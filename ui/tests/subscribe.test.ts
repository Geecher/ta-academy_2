import { test, expect } from '@Test';

test.describe('scroll to "Newsletter Subscription" section and subscribe to the newsletter', () => {
    test('subscribe to the newsletter', async ({ page, baseURL, homePage, dataLayer }) => {
        await homePage.open();

        await test.step('scroll to footer and subscribe', async () => {
            await homePage.FooterSub.scrollToFooter();
            await homePage.FooterSub.subscribe();
        });

        await test.step('check dataLayer', async () => {
            const expectedEvent = {
                event: 'GeneralInteraction',
                eventAction: 'Newsletter Subscription',
                eventCategory: 'Footer - D',
                eventLabel: 'Success',
            };

            await expect(async () => {
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'GeneralInteraction',
                    eventCategory: 'Footer - D',
                    eventAction: 'Newsletter Subscription',
                    eventLabel: 'Success',
                });

                expect(event).toStrictEqual(expectedEvent);
            }).toPass();
        });
    });
});
