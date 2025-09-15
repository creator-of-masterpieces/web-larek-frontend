import { IUser, TUserPayment } from '../../types';
import { IEvents } from '../core/EventEmitter';

// Интерфейс класса данных покупателя
export interface IUserData {
	getUserData (): Partial<IUser>;
	validateUser (userData: IUser): boolean;
	saveUserData (userData: Partial<IUser>): void;
	setPayment(method:TUserPayment): void;
	setAddress(address:string): void;
	setEmail(email:string): void;
	setPhone(phone:string): void;
}

export class UserData implements IUserData {
	protected events: IEvents;
	protected payment: TUserPayment;
	protected address: string;
	protected email: string;
	protected phone: string;
	protected user: IUser;

	constructor(events: IEvents) {
		this.events = events;
	}

	getUserData() {
		return this.user;
	};

	validateUser(userData: IUser) {
		return true;
	};

	saveUserData(userData: Partial<IUser>) {
		Object.assign(this.user, userData);
	};

	setPayment(method:TUserPayment) {
		this.payment = method;
	}

	setAddress(address:string) {
		this.address = address;
	}

	setEmail(email:string) {
		this.email = email;
	}

	setPhone(phone:string) {
		this.phone = phone;
	}
}