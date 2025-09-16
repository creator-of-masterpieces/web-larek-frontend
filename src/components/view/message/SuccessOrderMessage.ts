import { Component } from '../shared/Component';
import { IEvents } from '../../core/EventEmitter';
import { AppEvents } from '../../../utils/constants';

interface successOrderMessageProps {
	totalPrice: number;
}

export class SuccessOrderMessage extends Component<successOrderMessageProps>{
	protected events: IEvents;
	protected totalPriceElement: HTMLElement;
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.totalPriceElement = container.querySelector('.order-success__description');
		this.submitButton = container.querySelector('.order-success__close');
		this.submitButton.addEventListener('click', ()=> {
			events.emit(AppEvents.OrderSuccessMessageSuccessConfirm);
		})
	}

	set totalPrice(totalPrice: number) {
		this.totalPriceElement.textContent = `Списано ${totalPrice} синапсов`;
	}
}