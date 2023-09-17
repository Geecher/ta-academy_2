import { CartPage } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { waitForDataLayer } from '@Utils/dataLayer';

describe('add new item - check this, and remove him', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    test('click add cart item, fill all inputs and create new element', async () => {
        await cartPage.fulfill();
        const modal = await cartPage.getAddItemModal();

        reporter.startStep('Open modal - check this event');
        const incEvent = await waitForDataLayer({ name: 'FormInteraction' });
        expect(incEvent).toStrictEqual({ name: 'FormInteraction', value: 'Open' });
        reporter.endStep();

        reporter.startStep('Fill the inputs, create item and check this event');
        const newElement = {
            name: 'My test item',
            price: 100,
            quantity: 3,
        };
        await modal.createNewItem(newElement);

        const createEvent = await waitForDataLayer({ name: `Add item - ${newElement.name}` });
        expect(createEvent).toStrictEqual({
            name: `Add item - ${newElement.name}`,
            price: newElement.price,
            quantity: newElement.quantity,
            value: newElement.name,
        });
        reporter.endStep();

        reporter.startStep('Check new product in cart list');
        const cartList = await cartPage.getCartList();
        const [item] = await cartList.getCartItems();
        const itemData = {
            name: await item.getName(),
            price: await item.getPrice(),
            quantity: await item.getQuantity(),
        };

        expect(newElement).toStrictEqual(itemData);
        reporter.endStep();

        reporter.startStep('delete element and check this');
        await item.deleteElement();
        const [newFirstItem] = await cartList.getCartItems();
        expect(newFirstItem).not.toStrictEqual(item);
        reporter.endStep();

        reporter.startStep('Check event - delete item');
        const deleteElement = await waitForDataLayer({ name: `Delete item - ${newElement.name}` });
        expect(deleteElement).toStrictEqual({ name: `Delete item - ${newElement.name}`, value: newElement.name });
        reporter.endStep();

        reporter.startStep('delete all item from cart and check this');
        await cartList.deleteAllElements();

        const deleteAll = await waitForDataLayer({ name: 'Cart is Empty' });
        expect(deleteAll).toStrictEqual({ name: 'Cart is Empty', value: 'Quantity of products: 0' });

        reporter.endStep();
    });
});
