import { IUser, TUserPayment } from '../../types';

// Интерфейс класса данных покупателя
export interface IUserData {
	getUser (): IUser;
	validateUser (userData: IUser): boolean;
	saveUser (userData: IUser): void;
}

export class UserData implements IUserData {
	protected payment: TUserPayment;
	protected address: string;
	protected email: string;
	protected phone: string;
	protected user: IUser;

	getUser () {
		return this.user;
	};

	validateUser (userData: IUser) {
		return true;
	};

	saveUser (userData: IUser) {
		this.user = userData;
	};
}