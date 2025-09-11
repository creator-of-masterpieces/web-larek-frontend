import { Component } from '../shared/Component';
import { IEvents } from '../../core/EventEmitter';
import { ICard } from '../../../types';


export class Basket extends Component<any> {
	protected events: IEvents;
	protected submitButton: HTMLButtonElement;
	protected totalPriceCounter: HTMLElement;
	protected basketContent: HTMLElement;
	protected cards: ICard[];


	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.submitButton = container.querySelector('.basket__button');
		this.totalPriceCounter = container.querySelector('.basket__price');
	}

	set sotalPrice(totalPrice: number) {
		this.totalPriceCounter.textContent = totalPrice.toString();
	}

	set content(cards:HTMLElement[]) {
		this.basketContent.replaceChildren(...cards);
	}
}