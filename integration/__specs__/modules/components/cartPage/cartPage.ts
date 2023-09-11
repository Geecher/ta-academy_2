import { Container } from '@Core/container';
import { CartList } from '@Components/cartPage/cartList/cartList';
import { CartModal } from './cartModal';

export class CartPage extends Container {
    private selectors = {
        title: 'h1',
        cartList: './/div[@class="cart__list"]',
        addItemBtn: './/button[@class="btn btn_primary"]',
        modal: './/div[@data-testid="modal-inside"]',
    };

    public async fulfill(): Promise<void> {
        await super.fulfill();
    }

    public async getHeaderTitle(): Promise<string> {
        const [title] = await document.waitForQuerySelector(this.selectors.title);
        return title.textContent;
    }

    public async getCartList(): Promise<CartList> {
        const [cartListElement] = await document.waitForXpath(this.selectors.cartList);
        return new CartList(cartListElement);
    }

    public async getAddItemModal(): Promise<CartModal> {
        await document.clickByXpath(this.selectors.addItemBtn);
        const [cartModalElement] = await document.waitForXpath(this.selectors.modal);
        return new CartModal(cartModalElement);
    }
}
