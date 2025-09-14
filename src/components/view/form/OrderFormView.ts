import { IEvents } from '../../core/EventEmitter';
import { Component } from '../shared/Component';
import { IUser } from '../../../types';
import { AppEvents } from '../../../utils/constants';

interface OrderFormProps {
	address: string | null;

	validateUser(value: boolean): boolean;
}

export class OrderFormView extends Component<OrderFormProps> {
	protected events: IEvents;
	protected cardPaymentButton: HTMLButtonElement;
	protected cashPaymentButton: HTMLButtonElement;
	protected addressInputElement: HTMLInputElement;
	protected submitButtonElement: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);
		this.events = events;
		this.cardPaymentButton = container.querySelector('input[name = card]');
		this.cashPaymentButton = container.querySelector('input[name = cash]');
		this.addressInputElement = container.querySelector('input[name = address]');
		this.submitButtonElement = container.querySelector('button[type = submit]');

		this.submitButtonElement.addEventListener('click', () => {
			events.emit(AppEvents.FormOrderSubmit);
		})
	}

	set submitButton(value: boolean) {
		if (value) {
			this.submitButtonElement.disabled = false;
		}
		else {
			this.submitButtonElement.disabled = true;
		}
	}

	set address(text: string) {
		this.addressInputElement.value = text;
	}

	validateUser(userData: Partial<IUser>) {
		return true;
	}
}
