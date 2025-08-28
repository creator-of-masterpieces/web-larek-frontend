// Интерфесы данных
export interface ICard {
	id: string;
	title: string;
	image: string;
	category: string;
	price: number | null;
	description: string;
}

export interface ICardsData {
	cards: ICard[];
	preview: ICard;
	getCards ():ICard[];
	saveCards (cards: ICard[]): void;
	savePreview (cards: ICard[]): void;
	getCard(id: string): ICard[];
}

export interface IUserData {
	payment: 'card' | 'cash' | '';
	address: string;
	email: string;
	phone: string;
}