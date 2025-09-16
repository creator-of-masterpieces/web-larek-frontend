import { Component } from '../shared/Component';
import { IEvents } from '../../core/EventEmitter';
import { ICard } from '../../../types';
import { AppEvents } from '../../../utils/constants';

export type BasketProps = {totalPrice: number, content: HTMLElement[], submitButtonDisable: boolean};

export class BasketView extends Component<BasketProps> {
	protected events: IEvents;
	protected submitButtonElement: HTMLButtonElement;
	protected totalPriceCounter: HTMLElement;
	protected basketContent: HTMLElement;
	protected cards: ICard[];


	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.submitButtonElement = container.querySelector('.basket__button');
		this.totalPriceCounter = container.querySelector('.basket__price');
		this.basketContent = container.querySelector('.basket__list');

		this.submitButtonElement.addEventListener('click', ()=> {
			this.events.emit(AppEvents.BasketOrder);
		})
	}

	set totalPrice(totalPrice: number) {
		this.totalPriceCounter.textContent = totalPrice.toString();
	}

	set content(cards:HTMLElement[]) {
		this.basketContent.replaceChildren(...cards);
	}

	set submitButtonDisable(isEmpty: boolean) {
		if(isEmpty) {
			this.submitButtonElement.disabled = true;
		}
		else {
			this.submitButtonElement.disabled = false;
		}
	}
}