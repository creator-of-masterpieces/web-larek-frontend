import { IBaseFormView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';
import { Component } from '../shared/Component';
import { BaseFormView } from './BaseFormView';
import { AppEvents } from '../../../utils/constants';

// Интерфейс формы для сбора контактных данных
export interface IContactsFormView extends IBaseFormView {
	set email (email: string);
	set phone (text: string);
}

interface contactsFormProps {
	emailInputElement: HTMLInputElement;
	phoneInputElement: HTMLInputElement;
}

export class ContactsFormView extends BaseFormView implements IContactsFormView {
	protected events: IEvents
	protected emailInputElement: HTMLInputElement;
	protected phoneInputElement: HTMLInputElement;
	protected submitButtonElement: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.events	= events;
		this.emailInputElement = container.querySelector('input[name = email]');
		this.phoneInputElement = container.querySelector('input[name = phone]');
		this.submitButtonElement = container.querySelector('button[type = submit]');

		// Слушатель ввода email
		this.emailInputElement.addEventListener('input', () => {
			events.emit(AppEvents.FormContactsInputEmail, { email: this.emailInputElement.value });
			console.log('Ввод в поле email');
		})

		// Слушатель ввода phone
		this.phoneInputElement.addEventListener('input', () => {
			events.emit(AppEvents.FormContactsInputPhone, { phone: this.emailInputElement.value });
			console.log('Ввод в поле email');
		})
	}

	set email (email: string) {
		this.emailInputElement.textContent = email;
	}

	set phone (phone: string) {
		this.phoneInputElement.textContent = phone;
	}

	set submitButtonDisable(isValid: boolean) {
		if(isValid) {
			this.submitButtonElement.disabled = false;
		}
		else {
			this.submitButtonElement.disabled = true;
		}
	}

}