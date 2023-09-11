import { Component } from '@Core/component';

export class CartModal extends Component {
    protected selectors = {
        nameInput: '[data-testid="input-name"]',
        priceInput: '[data-testid="input-price"]',
        quantityInput: '[data-testid="input-quantity"]',
        saveBtn: './/button[text()="Create"]',
    };

    public async getNameInput(): Promise<Component> {
        const [inputName] = await this.element.waitForQuerySelector(this.selectors.nameInput);
        return new Component(inputName);
    }

    public async getPriceInput(): Promise<Component> {
        const [inputName] = await this.element.waitForQuerySelector(this.selectors.priceInput);
        return new Component(inputName);
    }

    public async getQuantityInput(): Promise<Component> {
        const [inputName] = await this.element.waitForQuerySelector(this.selectors.quantityInput);
        return new Component(inputName);
    }

    public async getSaveBtn(): Promise<Component> {
        const [inputName] = await this.element.waitForXpath(this.selectors.saveBtn);
        return new Component(inputName);
    }

    public async createNewItem({ name, price, quantity }): Promise<object> {
        (await this.getNameInput()).input(name);
        (await this.getPriceInput()).input(price);
        (await this.getQuantityInput()).input(quantity);
        (await this.getSaveBtn()).fireClick();
        return { name, price, quantity };
    }
}
