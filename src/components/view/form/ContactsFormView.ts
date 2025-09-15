import { IBaseFormView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';
import { Component } from '../shared/Component';
import { BaseFormView } from './BaseFormView';

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
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
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