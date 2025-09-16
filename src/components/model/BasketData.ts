import { ICard } from '../../types';
import { IEvents } from '../core/EventEmitter';
import { AppEvents } from '../../utils/constants';

// Интерфейс класса данных корзины
export interface IBasketData {
	addCard (card: ICard): void;
	removeCard (id: string): void;
	getTotalPrice(cards: ICard[]): number;
	getCards (): ICard[];
	isInBasket (id: string): boolean;
}

export class BasketData implements IBasketData {
	protected events: IEvents;
	protected cardsInBasket: ICard[];

	constructor(events: IEvents) {
		this.events = events;
		this.cardsInBasket = [];
	}

	addCard(card: ICard) {
		if (!this.isInBasket(card.id)) {
			this.cardsInBasket.push(card);
			this.events.emit(AppEvents.BasketChanged);
		}
		else {
			console.log(`${card.title} уже есть в корзине`)
		}
	}

	removeCard(id: string) {
		this.cardsInBasket = this.cardsInBasket.filter(item => item.id !== id);
		this.events.emit(AppEvents.BasketChanged);
	}

	getTotalPrice(): number {
		return this.cardsInBasket.reduce((sum, item) => sum + item.price, 0);
	}

	getCards(): ICard[] {
		return this.cardsInBasket;
	}

	isInBasket(id: string): boolean {
		return this.cardsInBasket.some(item => item.id === id);
	}

	getCardsCount() {
		return this.cardsInBasket.length;
	}

	isEmptyBasket() {
		if(this.cardsInBasket.length) {
			return false;
		}
		else {
			return true;
		}
}

	cleanBasket() {
			this.cardsInBasket = [];
			this.events.emit(AppEvents.BasketChanged);
}
}
