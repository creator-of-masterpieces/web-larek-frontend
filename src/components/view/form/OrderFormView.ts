import { IEvents } from '../../core/EventEmitter';
import { Component } from '../shared/Component';
import { IBaseFormView, IUser } from '../../../types';
import { AppEvents } from '../../../utils/constants';
import { BaseFormView } from './BaseFormView';

interface OrderFormProps {
	address: string | null;
	validateUser(value: boolean): boolean;
}

// Интерфейс формы сбора информации об оплате и адресе
export interface IOrderFormView extends IBaseFormView {
	set address (text: string);
	set enableSubmit(value: boolean);
	validateUser(userData: Partial<IUser>): boolean;
}

export class OrderFormView extends BaseFormView implements IOrderFormView {
	protected events: IEvents;
	protected cardPaymentButton: HTMLButtonElement;
	protected cashPaymentButton: HTMLButtonElement;
	protected addressInputElement: HTMLInputElement;
	protected submitButtonElement: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.cardPaymentButton = container.querySelector('input[name = card]');
		this.cashPaymentButton = container.querySelector('input[name = cash]');
		this.addressInputElement = container.querySelector('input[name = address]');
		this.submitButtonElement = container.querySelector('button[type = submit]');

		this.submitButtonElement.addEventListener('click', () => {
			events.emit(AppEvents.FormOrderSubmit);
		})

		this.cardPaymentButton.addEventListener('click', () => {
			this.events.emit(AppEvents.FormOrderOnline);
		})

		this.cashPaymentButton.addEventListener('click', () => {
			this.events.emit(AppEvents.FormOrderCash);
		})
	}

	set enableSubmit(value: boolean) {
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
