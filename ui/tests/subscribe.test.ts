import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DataLayer } from '@Utils/dataLayer';

test.describe('scroll to "Newsletter Subscription" section and subscribe to the newsletter', () => {
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
    test('subscribe to the newsletter', async ({ page, baseURL }) => {
        const footerInput = page.locator('//footer//input[@placeholder="Enter your Email"]');
        const randomEmail = faker.internet.email();
        const SinpUpBtn = page.locator('//footer//button[contains(., "Sign Up")]');
        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'GeneralInteraction',
            eventAction: 'Newsletter Subscription',
            eventCategory: 'Footer - D',
            eventLabel: 'Success',
        };

        await test.step('scroll to footer and subscribe', async () => {
            await footerInput.scrollIntoViewIfNeeded();
            await footerInput.fill(randomEmail);
            await SinpUpBtn.click();
        });

        await test.step('check dataLayer', async () => {
            const [event] = await dataLayer.waitForDataLayer({
                event: 'GeneralInteraction',
                eventCategory: 'Footer - D',
                eventAction: 'Newsletter Subscription',
                eventLabel: 'Success',
            });

            expect(event).toStrictEqual(expectedEvent);
        });
    });
});

// asdasd
