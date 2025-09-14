import { IFormView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';
import { Component } from '../shared/Component';

// Интерфейс формы для сбора контактных данных
export interface IContactsFormView extends IFormView {
	set email (email: string);
	set phone (text: string);
}

interface contactsFormProps {
	emailInputElement: HTMLInputElement;
	phoneInputElement: HTMLInputElement;
}

export class ContactsFormView extends Component<contactsFormProps>{
	protected events: IEvents
	protected emailInputElement: HTMLInputElement;
	protected phoneInputElement: HTMLInputElement;
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events	= events;
		this.emailInputElement = container.querySelector('input[name = email]');
		this.phoneInputElement = container.querySelector('input[phone = email]');
		this.submitButton = container.querySelector('button[type = submit]');
	}

	set email (email: string) {
		this.emailInputElement.textContent = email;
	}

	set phone (phone: string) {
		this.phoneInputElement.textContent = phone;
	}
}