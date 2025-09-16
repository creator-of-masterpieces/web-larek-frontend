import { IUser, TUserPayment } from '../../types';
import { IEvents } from '../core/EventEmitter';
import { AppEvents } from '../../utils/constants';

// Интерфейс класса данных покупателя
export interface IUserData {
	getUserData(): Partial<IUser>;
	validateUser(userData: IUser): boolean;
	setPayment(method: TUserPayment): void;
	setAddress(address: string): void;
	setEmail(email: string): void;
	setPhone(phone: string): void;
	isOrderDataValid(): boolean;
}

export class UserData implements IUserData {
	protected events: IEvents;
	protected payment: TUserPayment;
	protected address: string;
	protected email: string;
	protected phone: string;
	protected user: IUser;
	protected error: string;

	constructor(events: IEvents) {
		this.events = events;
	}

	getUserData() {
		return {
			payment: this.payment,
			address: this.address,
			email: this.email,
			phone: this.phone,
		}
	}

	validateUser(userData: IUser) {
		return true;
	}

	setPayment(method: TUserPayment) {
		this.payment = method;
		this.events.emit(AppEvents.PaymentSaved, { payment: this.payment });
		console.log(`Сохранен метод оплаты: ${this.payment}`);
	}

	setAddress(address: string) {
		this.address = address;
		this.events.emit(AppEvents.AddressSaved);
		console.log(`Сохранен адрес: ${this.address}`);
	}

	setEmail(email: string) {
		this.email = email;
		this.events.emit(AppEvents.EmailSaved);
	}

	setPhone(phone: string) {
		this.phone = phone;
		this.events.emit(AppEvents.PhoneSaved);
	}

	isOrderDataValid() {
		if (this.payment && this.address) {
			this.error = '';
			return true;
		} else {
			this.error = 'Необходимо указать адрес';
			return false;
		}
	}

	isContactsDataValid() {
		if (this.email && this.phone) {
			this.error = '';
			return true;
		} else {
			return false;
		}
	}

	getError() {
		return this.error;
	}

	clearData() {
		this.payment = null;
		this.address = null;
		this.email = null;
		this.phone = null;
	}
}
