// Типы

// Способы оплаты
export type TUserPayment = 'card' | 'cash' | '';

// Карточка
export interface ICard {
	id: string;
	title: string;
	image: string;
	category: string;
	price: number | null;
	description: string;
}

// Данные покупателя
export interface IUser {
	payment: TUserPayment
	address: string;
	email: string;
	phone: string;
}

// Интерфейсы слоя данных

// Интерфейс класса данных каталога карточек
export interface ICardsData {
	cards: ICard[];
	preview: ICard;
	getCards ():ICard[];
	saveCards (cards: ICard[]): void;
	savePreview (cards: ICard[]): void;
	getCard(id: string): ICard[];
}

// Интерфейс класса данных покупателя
export interface IUserData {
	payment: TUserPayment
	address: string;
	email: string;
	phone: string;
	GetUser (): IUser;
	ValidateUser (userData: IUser): boolean;
	SaveUser (userData: IUser): void;
}

// Интерфейс класса данных корзины
export interface IBasketData {
	Cards: ICard[];
	AddCard (card: ICard[]): void;
	RemoveCard (id: string): void;
	GetTotalPrice(cards: ICard[]): number;
	GetCards (): ICard[];
	IsInBasket (id: string): boolean;
}

// Интерфейсы слоя представления

